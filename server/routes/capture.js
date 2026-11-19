const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { validateCapture } = require('../middleware/validate');

// Ensure captures directory exists
const CAPTURE_DIR = path.join(__dirname, '../../captures');
if (!fs.existsSync(CAPTURE_DIR)) {
    fs.mkdirSync(CAPTURE_DIR, { recursive: true });
}

const Session = require('../models/Session');
const Settings = require('../models/Settings');

router.post('/', validateCapture, async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        // Fetch settings
        const settings = await Settings.findOne() || new Settings();

        // Remove header
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');

        const filename = `capture-${Date.now()}.png`;
        // Use configured directory or default
        const saveDir = settings.saveDirectory && fs.existsSync(settings.saveDirectory)
            ? settings.saveDirectory
            : CAPTURE_DIR;

        const filepath = path.join(saveDir, filename);

        // Sharp Processing
        let imageProcessor = sharp(buffer);

        // Apply Watermark/Overlay if enabled and path exists
        if (settings.watermarkEnabled && settings.overlayPath && fs.existsSync(settings.overlayPath)) {
            imageProcessor = imageProcessor.composite([{ input: settings.overlayPath, gravity: 'southeast' }]);
        }

        await imageProcessor.toFile(filepath);

        // Create Session Log
        await Session.create({
            filepath,
            status: 'success',
            metadata: { timestamp: new Date() }
        });

        console.log(`Saved image to ${filepath}`);

        res.json({ success: true, filepath });
    } catch (err) {
        console.error("Error saving image:", err);
        // Try to log failed session
        try {
            await Session.create({ status: 'failed', metadata: { error: err.message } });
        } catch (e) { }

        res.status(500).json({ error: 'Failed to save image' });
    }
});

module.exports = router;

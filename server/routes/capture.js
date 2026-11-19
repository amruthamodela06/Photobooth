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

// GET /api/capture — List all captured images
router.get('/', async (req, res) => {
    try {
        const settings = await Settings.findOne() || new Settings();
        const captureDir = settings.saveDirectory && fs.existsSync(settings.saveDirectory)
            ? settings.saveDirectory
            : CAPTURE_DIR;

        const files = fs.readdirSync(captureDir)
            .filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f))
            .map(f => {
                const fullPath = path.join(captureDir, f);
                const stat = fs.statSync(fullPath);
                return {
                    filename: f,
                    filepath: fullPath,
                    sizeBytes: stat.size,
                    createdAt: stat.birthtime
                };
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({ count: files.length, captures: files });
    } catch (err) {
        console.error('[capture] Error listing captures:', err);
        res.status(500).json({ error: 'Failed to list captures' });
    }
});

// GET /api/capture/file/:filename - Stream a captured image file to the client
router.get('/file/:filename', async (req, res) => {
    try {
        const { filename } = req.params;
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({ error: 'Invalid filename' });
        }
        const settings = await Settings.findOne() || new Settings();
        const captureDir = settings.saveDirectory && fs.existsSync(settings.saveDirectory)
            ? settings.saveDirectory
            : CAPTURE_DIR;
        const filepath = path.join(captureDir, filename);
        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'File not found' });
        }
        res.set('Cache-Control', 'public, max-age=86400');
        res.sendFile(filepath);
    } catch (err) {
        console.error('[capture] Error serving file:', err);
        res.status(500).json({ error: 'Failed to serve file' });
    }
});

// DELETE /api/capture/:filename — Delete a captured image by filename
router.delete('/:filename', async (req, res) => {
    try {
        const { filename } = req.params;

        // Basic path traversal protection
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return res.status(400).json({ error: 'Invalid filename' });
        }

        const settings = await Settings.findOne() || new Settings();
        const captureDir = settings.saveDirectory && fs.existsSync(settings.saveDirectory)
            ? settings.saveDirectory
            : CAPTURE_DIR;

        const filepath = path.join(captureDir, filename);

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        fs.unlinkSync(filepath);

        // Remove matching session log entries
        await Session.deleteMany({ filepath });

        console.log(`[capture] Deleted: ${filepath}`);
        res.json({ success: true, deleted: filename });
    } catch (err) {
        console.error('[capture] Error deleting capture:', err);
        res.status(500).json({ error: 'Failed to delete capture' });
    }
});

module.exports = router;

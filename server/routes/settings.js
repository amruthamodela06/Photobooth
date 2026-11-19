const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Allowed fields for update (whitelist to prevent schema pollution)
const ALLOWED_FIELDS = [
    'boothName', 'saveDirectory', 'countdownTime', 'overlayPath',
    'watermarkEnabled', 'countdownDuration', 'autoPrint', 'autoAdvance',
    'delayBetweenShots', 'printCopies', 'watermarkText'
];

// GET /api/settings — Get settings (create defaults if not exists)
router.get('/', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = new Settings();
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

// PUT /api/settings — Full settings update
router.put('/', async (req, res) => {
    try {
        const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true });
        res.json(settings);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: err.errors });
        }
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

// PATCH /api/settings — Partial settings update (only provided fields)
router.patch('/', async (req, res) => {
    try {
        // Filter to only allowed fields
        const updates = {};
        for (const key of ALLOWED_FIELDS) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                error: 'No valid fields provided',
                allowedFields: ALLOWED_FIELDS
            });
        }

        const settings = await Settings.findOneAndUpdate(
            {},
            { $set: updates },
            { new: true, upsert: true, runValidators: true }
        );
        res.json(settings);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation failed', details: err.errors });
        }
        res.status(500).json({ error: 'Failed to patch settings' });
    }
});

/**
 * POST /api/settings/reset
 * Wipes existing settings document and re-creates one using all schema defaults.
 * Useful for factory-resetting the booth between events or for testing.
 */
// POST /api/settings/reset — Reset settings to schema defaults
router.post('/reset', async (req, res) => {

    try {
        await Settings.deleteMany({});
        const freshSettings = new Settings();
        await freshSettings.save();
        res.json({ message: 'Settings reset to defaults', settings: freshSettings });
    } catch (err) {
        res.status(500).json({ error: 'Failed to reset settings' });
    }
});

module.exports = router;

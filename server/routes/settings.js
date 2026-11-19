const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// Allowed fields for update (whitelist to prevent schema pollution)
const ALLOWED_FIELDS = [
    'boothName', 'saveDirectory', 'countdownTime', 'overlayPath',
    'watermarkEnabled', 'countdownDuration', 'autoPrint', 'autoAdvance',
    'delayBetweenShots', 'printCopies', 'watermarkText'
];

// Schema-level validators applied before saving
const validateSettingsInput = (data) => {
    const errors = [];
    if (data.boothName !== undefined && typeof data.boothName !== 'string') {
        errors.push('boothName must be a string');
    }
    if (data.printCopies !== undefined && (data.printCopies < 1 || data.printCopies > 10)) {
        errors.push('printCopies must be between 1 and 10');
    }
    if (data.countdownDuration !== undefined && (data.countdownDuration < 1 || data.countdownDuration > 10)) {
        errors.push('countdownDuration must be between 1 and 10 seconds');
    }
    if (data.delayBetweenShots !== undefined && (data.delayBetweenShots < 500 || data.delayBetweenShots > 10000)) {
        errors.push('delayBetweenShots must be between 500ms and 10000ms');
    }
    if (data.watermarkText !== undefined && data.watermarkText.length > 100) {
        errors.push('watermarkText cannot exceed 100 characters');
    }
    return errors;
};

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
        const validationErrors = validateSettingsInput(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ error: 'Validation failed', messages: validationErrors });
        }
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
        const validationErrors = validateSettingsInput(req.body);
        if (validationErrors.length > 0) {
            return res.status(400).json({ error: 'Validation failed', messages: validationErrors });
        }

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

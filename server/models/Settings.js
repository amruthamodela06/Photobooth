const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    boothName: { type: String, default: 'FlashPoint Booth', trim: true },
    saveDirectory: { type: String, default: '' },
    countdownTime: { type: Number, default: 3, min: 1, max: 10 },
    overlayPath: { type: String, default: '' },
    watermarkEnabled: { type: Boolean, default: false },
    // Countdown & session flow
    countdownDuration: { type: Number, default: 3, min: 1, max: 10 },
    autoPrint: { type: Boolean, default: false },
    autoAdvance: { type: Boolean, default: false },
    delayBetweenShots: { type: Number, default: 2000, min: 500, max: 10000 }, // ms
    // Print settings
    printCopies: { type: Number, default: 1, min: 1, max: 10 },
    watermarkText: { type: String, default: '', trim: true, maxlength: 100 },
}, { timestamps: true });


module.exports = mongoose.model('Settings', SettingsSchema);

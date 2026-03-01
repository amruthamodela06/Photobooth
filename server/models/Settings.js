const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    boothName: { type: String, default: "FlashPoint Booth" },
    saveDirectory: { type: String, default: "" }, // Empty means default to app directory
    countdownTime: { type: Number, default: 3 },
    overlayPath: { type: String, default: "" },
    watermarkEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.model('Settings', SettingsSchema);

const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    filepath: String,
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    metadata: Object
});

module.exports = mongoose.model('Session', SessionSchema);

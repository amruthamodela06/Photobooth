const mongoose = require('mongoose');
const logger = require('../utils/logger');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/flashpoint_db';

/**
 * connectDB — Establishes a Mongoose connection to MongoDB.
 * Uses the MONGO_URI environment variable if set, otherwise falls back
 * to the default local connection string.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        logger.info('MongoDB Connected successfully', { uri: MONGO_URI.replace(/\/\/.*@/, '//***@') });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('MongoDB reconnected');
        });

        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB runtime error', { error: err.message });
        });
    } catch (err) {
        logger.error('MongoDB initial connection failed', { error: err.message });
        process.exit(1);
    }
};

module.exports = connectDB;

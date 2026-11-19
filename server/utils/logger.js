const { createLogger, format, transports } = require('winston');
const path = require('path');

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_DIR = path.join(__dirname, '../../logs');

// Ensure log directory exists
const fs = require('fs');
if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
}

const logger = createLogger({
    level: LOG_LEVEL,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [
        // Console transport — human-readable in development
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ timestamp, level, message, ...meta }) => {
                    const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
                    return `[${timestamp}] ${level}: ${message}${extra}`;
                })
            )
        }),
        // File transport — JSON for structured log parsing
        new transports.File({
            filename: path.join(LOG_DIR, 'error.log'),
            level: 'error'
        }),
        new transports.File({
            filename: path.join(LOG_DIR, 'combined.log')
        })
    ]
});

module.exports = logger;

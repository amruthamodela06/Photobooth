/**
 * validateCapture - Middleware that validates incoming capture request bodies.
 * Ensures the base64 image data is present and correctly formatted
 * before it reaches the route handler.
 */
const validateCapture = (req, res, next) => {
    const { image } = req.body;

    if (!image) {
        return res.status(400).json({
            error: 'Validation failed',
            message: 'Missing required field: image'
        });
    }

    if (typeof image !== 'string') {
        return res.status(400).json({
            error: 'Validation failed',
            message: 'Field "image" must be a base64 string'
        });
    }

    const validPrefixes = ['data:image/png;base64,', 'data:image/jpeg;base64,', 'data:image/webp;base64,'];
    const hasValidPrefix = validPrefixes.some(prefix => image.startsWith(prefix));

    if (!hasValidPrefix) {
        return res.status(400).json({
            error: 'Validation failed',
            message: 'Field "image" must be a valid base64 data URI (png, jpeg, or webp)'
        });
    }

    // Rough size check: reject images over ~25MB of base64 data
    const MAX_BASE64_LENGTH = 25 * 1024 * 1024 * (4 / 3);
    if (image.length > MAX_BASE64_LENGTH) {
        return res.status(413).json({
            error: 'Validation failed',
            message: 'Image exceeds the maximum allowed size of 25MB'
        });
    }

    next();
};

module.exports = { validateCapture };

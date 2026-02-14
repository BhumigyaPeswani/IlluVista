/**
 * Global error handler middleware.
 * Must be registered AFTER all routes.
 * Standardizes all error responses to: { success: false, error: string }
 */
function errorHandler(err, req, res, _next) {
    console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const details = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message,
        }));
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details,
        });
    }

    // Mongoose cast error (invalid ObjectId etc.)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: `Invalid ${err.path}: ${err.value}`,
        });
    }

    // Duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(409).json({
            success: false,
            error: `Duplicate value for field: ${field}`,
        });
    }

    // Default 500
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'production'
        ? 'Internal Server Error'
        : err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        error: message,
    });
}

module.exports = { errorHandler };

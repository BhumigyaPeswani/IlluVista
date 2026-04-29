const { ZodError } = require('zod');

/**
 * Creates validation middleware from a Zod schema.
 * Validates req.body by default. Pass 'query' or 'params' as target.
 */
function validate(schema, target = 'body') {
    return (req, res, next) => {
        try {
            const parsed = schema.parse(req[target]);
            req[target] = parsed; // Replace with cleaned/validated data
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errors = error.issues.map(e => ({
                    field: e.path.join('.'),
                    message: e.message,
                }));
                return res.status(400).json({
                    success: false,
                    error: 'Validation failed',
                    details: errors,
                });
            }
            next(error);
        }
    };
}

module.exports = { validate };

const { ZodError } = require('zod');

const exception_handler = (error, req, res, next) => {
    //console.error(`${req.method} ${req.path} - Error:`, error);
    if (error instanceof ZodError) {
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            issues: error.issues.map(err => ({
                field: err.path.join("."),
                message: err.message,
                code: err.code
            }))
        });
    }

    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : error.message,
        ...(process.env.NODE_ENV !== 'production' && {
            stack: error.stack,
            name: error.name
        })
    });
}

module.exports = exception_handler;

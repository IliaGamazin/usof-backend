const { ZodError } = require('zod');
const { JsonWebTokenError} = require("jsonwebtoken");

const AppException = require("../exceptions/AppException");

const exception_handler = (error, req, res, next) => {
    console.error(`${req.method} ${req.path} - Error:`, error);
    console.log(error);

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

    if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "JWT Token Error",
            error: {
                name: error.name,
                message: error.message
            }
        })
    }

    if (!(error instanceof AppException)) {
        error = new AppException(
            error.message || 'Internal server error',
            error.statusCode || 500
        );
    }

    res.status(error.statusCode).json(error.toJSON());
}

module.exports = exception_handler;

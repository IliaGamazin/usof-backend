import { ZodError } from 'zod';
import pkg from 'jsonwebtoken';
const { JsonWebTokenError } = pkg;

import AppException from "../exceptions/AppException.js";

const exception_handler = (error, req, res, next) => {

    if (error instanceof ZodError) {
        console.error(`${req.method} ${req.path} - Error: VALIDATION`);
        return res.status(400).json({
            success: false,
            message: "Validation failed.",
            error: error.issues[0]
        });
    }

    if (error instanceof JsonWebTokenError) {
        console.error(`${req.method} ${req.path} - Error: JWT`);
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
    console.error(`${req.method} ${req.path} - Error:` + error);
    res.status(error.statusCode).json(error.toJSON());
}

export default exception_handler;

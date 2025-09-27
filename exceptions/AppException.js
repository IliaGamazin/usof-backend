class AppException extends Error {
    constructor(message, status = 500, type= "AppException", details = null) {
        super(message);
        this.statusCode = status;
        this.type = type;
        this.details = details;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            success: false,
            error: {
                type: this.constructor.name,
                message: this.message,
                statusCode: this.statusCode,
                details: this.details,
            }
        };
    }
}


export default AppException;

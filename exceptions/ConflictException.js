const AppException = require('./AppException');

class ConflictException extends AppException {
    constructor(message) {
        super(message, 409, "ConflictException");
    }
}

module.exports = ConflictException;

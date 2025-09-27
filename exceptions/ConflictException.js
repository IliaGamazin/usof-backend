import AppException from './AppException.js';

class ConflictException extends AppException {
    constructor(message) {
        super(message, 409, "ConflictException");
    }
}

export default ConflictException;

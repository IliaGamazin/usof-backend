import AppException from './AppException.js';

class NotFoundException extends AppException {
    constructor(message) {
        super(message, 404, "NotFoundException");
    }
}

export default NotFoundException;

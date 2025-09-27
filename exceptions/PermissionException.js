import AppException from './AppException.js';

class PermissionException extends AppException {
    constructor(message) {
        super(message, 403, "PermissionException");
    }
}

export default PermissionException;

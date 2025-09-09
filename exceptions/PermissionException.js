const AppException = require('./AppException');

class PermissionException extends AppException {
    constructor(message) {
        super(message, 403, "PermissionException");
    }
}

module.exports = PermissionException;

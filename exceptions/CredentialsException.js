const AppException = require('./AppException');

class CredentialsException extends AppException {
    constructor(message) {
        super(message, 401, "CredentialsException");
    }
}

module.exports = CredentialsException;

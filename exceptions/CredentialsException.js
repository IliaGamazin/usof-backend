import AppException from './AppException.js';

class CredentialsException extends AppException {
    constructor(message) {
        super(message, 401, "CredentialsException");
    }
}

export default CredentialsException;

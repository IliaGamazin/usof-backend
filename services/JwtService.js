import jwt from 'jsonwebtoken';

class JwtService {
    static generate_access_token(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });
    }

    static generate_refresh_token(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
    }

    static verify_access_token(token) {
        try {
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        }
        catch (error) {
            throw error;
        }
    }

    static verify_refresh_token(token) {
        try {
            return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        }
        catch (error) {
            throw error;
        }
    }

    static generate_token_pair(payload) {
        const access_payload = payload;
        const refresh_payload = {id: payload.id};

        return {
            access_token: this.generate_access_token(access_payload),
            refresh_token: this.generate_refresh_token(refresh_payload),
        }
    }

    static generate_password_reset_token(payload) {
        return jwt.sign(payload, process.env.PASSWORD_RESET_SECRET || process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
    }

    static verify_password_reset_token(token) {
        try {
            return jwt.verify(token, process.env.PASSWORD_RESET_SECRET || process.env.ACCESS_TOKEN_SECRET);
        }
        catch (error) {
            throw error;
        }
    }
}

export default JwtService;
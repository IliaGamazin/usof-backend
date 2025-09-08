class ValidationMiddleware {
    static validate(schema) {
        return (req, res, next) => {
            try {
                req.body = schema.parse(req.body);
                next();
            }
            catch (error) {
                next(error);
            }
        }
    }
}

module.exports = ValidationMiddleware;

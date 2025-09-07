const Model = require("./utils/Model");

class User extends Model {
    static table_name = "users";

    constructor(attributes = {}) {
        super(attributes);
    }

    get_safe_attributes() {
        return {
            id: this.id,
            email: this.email,
            role: this.role,
        }
    }
}

module.exports = User;

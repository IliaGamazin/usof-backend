const Model = require("./utils/Model");

class User extends Model {
    static table_name = "users";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = User;


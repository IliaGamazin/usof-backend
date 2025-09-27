import Model from "./utils/Model.js";

class User extends Model {
    static table_name = "users";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default User;

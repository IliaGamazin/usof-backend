import Model from "./utils/Model.js";

class UsersSubscriptions extends Model {
    static table_name = "users_subscriptions";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default UsersSubscriptions;

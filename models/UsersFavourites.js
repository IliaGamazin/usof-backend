import Model from "./utils/Model.js";

class UsersFavourites extends Model {
    static table_name = "users_favourites";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default UsersFavourites;

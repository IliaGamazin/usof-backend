import Model from "./utils/Model.js";

class Comment extends Model {
    static table_name = "comments";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Comment;

import Model from "./utils/Model.js";

class Post extends Model {
    static table_name = "posts";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default Post;

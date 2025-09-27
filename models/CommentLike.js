import Model from "./utils/Model.js";

class CommentLike extends Model {
    static table_name = "comment_likes";

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default CommentLike;

const Model = require("./utils/Model");

class CommentLike extends Model {
    static table_name = "comment_likes";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = CommentLike;

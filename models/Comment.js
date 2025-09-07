const Model = require("./utils/Model");

class Comment extends Model {
    static table_name = "comments";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Comment;
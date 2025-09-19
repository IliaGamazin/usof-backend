const Model = require("./utils/Model");

class PostsCategories extends Model {
    static table_name = "posts_categories"

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = PostsCategories;

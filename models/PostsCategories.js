import Model from "./utils/Model.js";

class PostsCategories extends Model {
    static table_name = "posts_categories"

    constructor(attributes = {}) {
        super(attributes);
    }
}

export default PostsCategories;

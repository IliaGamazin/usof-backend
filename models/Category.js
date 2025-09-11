const Model = require("./utils/Model");

class Category extends Model {
    static table_name = "categories";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Category;

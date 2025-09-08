const Model = require("./utils/Model");

class Like extends Model {
    static table_name = "likes";

    constructor(attributes = {}) {
        super(attributes);
    }
}

module.exports = Like;

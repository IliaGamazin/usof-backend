const Model = require("./utils/Model");
const path = require("path");
const fs = require("fs");

class PostImage extends Model {
    static table_name = "post_images";

    constructor(attributes = {}) {
        super(attributes);
    }

    async delete() {
        const filename = this.file_path.split('/').pop();
        console.log(filename);
        await this._delete_file(`posts/${this.post_id}`, filename);
        await super.delete();
    }

    async _delete_file(sub_dir, filename) {
        const file_path = path.join(path.join(process.cwd(), "vault"), sub_dir, filename);

        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
            return true;
        }

        return false;
    }
}

module.exports = PostImage;

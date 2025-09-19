const fs = require('fs');
const path = require('path');

const CredentialsException = require("../exceptions/CredentialsException");
const PostImage = require("../models/PostImage");

class FileService {
    constructor(base = "vault") {
        this.base = path.join(process.cwd(), base);
        this.ensure_dir(this.base);
    }

    ensure_dir(dir) {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    }

    async save_file(file, sub_dir, filename) {
        const dir_path = path.join(this.base, sub_dir);
        this.ensure_dir(dir_path);

        const ext = path.extname(file.originalname);
        if (!ext) {
            throw new CredentialsException('Invalid image format');
        }
        const full_filename = `${filename}${ext}`;
        const file_path = path.join(dir_path, full_filename);

        if (file.buffer) {
            fs.writeFileSync(file_path, file.buffer);
        }
        else {
            throw new Error("File buffer not found");
        }
        return {
            filename: full_filename,
            path: file_path,
            relativePath: `/${path.relative(process.cwd(), file_path)}`,
            url: `/vault/${sub_dir}/${full_filename}`
        };
    }

    async save_post_images(id, files) {
        let info_arr = [];
        for (let i = 0; i < files.length; i++) {
            const info = await this.save_image(
                files[i],
                `posts/${id}`,
                `${files[i].originalname}_${i}_$${Date.now()}`,
            );
            const post_image = new PostImage({
                post_id: id,
                file_path: info.url
            });
            await post_image.save();
            info_arr.push(info);
        }
        return info_arr
    }

    async save_image(file, sub_dir, filename) {
        const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
        if (!allowed.includes(file.mimetype)) {
            throw new CredentialsException('Invalid image format');
        }

        return this.save_file(file, sub_dir, filename);
    }

    async delete_file(sub_dir, filename) {
        const file_path = path.join(this.base, sub_dir, filename);

        if (fs.existsSync(file_path)) {
            fs.unlinkSync(file_path);
            return true;
        }

        return false;
    }

    async delete_post_directory(post_id) {
        const post_dir = path.join(this.base, 'posts', post_id.toString());

        if (fs.existsSync(post_dir)) {
            fs.rmSync(post_dir, { recursive: true, force: true });
            return true;
        }

        return false;
    }
}

module.exports = new FileService();

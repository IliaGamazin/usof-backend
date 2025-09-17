const fs = require('fs');
const path = require('path');

const CredentialsException = require("../exceptions/CredentialsException");

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
}

module.exports = new FileService();

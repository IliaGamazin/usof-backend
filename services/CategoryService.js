const Category = require("../models/Category");

const CredentialsException = require("../exceptions/CredentialsException");
const ConflictException = require("../exceptions/ConflictException");

class CategoryService {
    async get_category(id) {
        const category = await Category.find({ id });
        if (!category) {
            throw new CredentialsException("No category with id");
        }

        return {
            id: category.id,
            title: category.title,
            description: category.description,
        };
    }

    async new_category(title, description) {
        const categories = await Category.get_all({
            title
        });

        console.log(categories);

        if (categories.length > 0) {
            throw new ConflictException("Category already exists");
        }

        const category = new Category({
            title,
            description
        })

        await category.save();
        return category;
    }

    async update_category(id, title, description) {
        const same = await Category.get_all({ title });

        if (same.length > 0) {
            throw new ConflictException("Category with title already exists");
        }

        const category = await Category.find({ id });
        if (!category) {
            throw new CredentialsException("No category with id");
        }

        category.title = title;
        category.description = description;

        console.log(category);

        await category.save();
        return category;
    }

    async delete_category(id) {
        const category = await Category.find({ id });
        if (!category) {
            throw new CredentialsException("No category with id");
        }

        await category.delete();
    }
}

module.exports = new CategoryService();

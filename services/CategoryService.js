import Category from "../models/Category.js";

import NotFoundException from "../exceptions/NotFoundException.js";
import ConflictException from "../exceptions/ConflictException.js";
import PostsCategories from "../models/PostsCategories.js";
import Post from "../models/Post.js";

class CategoryService {
    async get_category(id) {
        const category = await Category.find({ id });
        if (!category) {
            throw new NotFoundException("No category with id");
        }

        return {
            id: category.id,
            title: category.title,
            description: category.description,
        };
    }

    async get_category_posts(id, page, limit, order_by, order_dir) {
        const category = await Category.find({ id });
        if (!category) {
            throw new NotFoundException("No category with id");
        }

        return await Post.get_joined_paged({
            joins: [
                {
                    table: 'posts_categories',
                    condition: `posts.id = posts_categories.post_id`
                }
            ],
            where: {
                'posts_categories.category_id': id
            },
            page,
            limit,
            order_by: `posts.${order_by}`,
            order_dir,
            select: 'posts.*'
        });
    }

    async new_category(title, description) {
        const categories = await Category.get_all({
            title
        });

        if (categories.length > 0) {
            throw new ConflictException("Category already exists");
        }

        const category = new Category({
            title,
            description
        });

        await category.save();
        return category;
    }

    async update_category(id, title, description) {
        if (title !== undefined && title !== null) {
            const same = await Category.find({ title });
            if (same && same.id !== parseInt(id)) {
                throw new ConflictException("Category with title already exists");
            }
        }

        const category = await Category.find({ id });
        if (!category) {
            throw new NotFoundException("No category with id");
        }

        if (title !== undefined && title !== null) {
            category.title = title;
        }

        if (description !== undefined && description !== null) {
            category.description = description;
        }

        await category.save();
        return category;
    }



    async delete_category(id) {
        const category = await Category.find({ id });
        if (!category) {
            throw new NotFoundException("No category with id");
        }

        await category.delete();
    }

    async save_categories(post_id, categories_ids) {
        for (const category_id of categories_ids) {
            let pc = new PostsCategories()
            pc.post_id = post_id;
            pc.category_id = category_id;
            await pc.save();
        }
    }

    async parse_categories(categories) {
        let res = [];
        for (const title of categories) {
            let category = await Category.find({ title });
            if (!category) {
                throw new NotFoundException("Category does not exists");
            }
            res.push(category.id);
        }
        return res;
    }
}

export default new CategoryService();

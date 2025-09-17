const CategoryService = require("../services/CategoryService");
const Category = require("../models/Category");
const User = require("../models/User");

class CategoriesController {
    async get_categories(req, res, next) {
        try {
            let page = parseInt(req.query.page, 10) || 1;
            let limit = parseInt(req.query.limit, 10) || 10;
            let order_by = req.query.orderBy || "id";
            let order_dir = req.query.orderDir || "ASC";
            const allowed = ["id", "title"];

            if (!allowed.includes(order_by)) {
                order_by = "id";
            }

            const result = await Category.get_all_paged({
                page,
                limit,
                order_by,
                order_dir,
            });

            const res_data = result.data.map(user => {
                const { password, ...safe } = user; // strip password
                return safe;
            });

            res.json({
                data: res_data,
                pagination: result.pagination,
            });
        }
        catch (error) {
            next(error);
        }
    }

    async get_category(req, res, next) {
        try {
            const id = req.params.category_id;
            const category = await CategoryService.get_category(id);
            res.status(200).json(category);
        }
        catch (error) {
            next(error);
        }
    }

    async get_category_posts(req, res, next) {
        try {
            res.status(200).json({});
        }
        catch (error) {
            next(error);
        }
    }

    async new_category(req, res, next) {
        try {
            const { title, description } = req.body;
            await CategoryService.new_category(title, description);
            return res.status(201).send();
        }
        catch (error) {
            next(error);
        }
    }

    async update_category(req, res, next) {
        try {
            const id = req.params.category_id;
            const { title, description } = req.body;
            await CategoryService.update_category(id, title, description);
            return res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }

    async delete_category(req, res, next) {
        try {
            const id = req.params.category_id;
            await CategoryService.delete_category(id);
            res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoriesController();

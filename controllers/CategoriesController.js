const CategoryService = require("../services/CategoryService");

class CategoriesController {
    async get_categories(req, res, next) {
        try {
            res.status(200).json({});
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

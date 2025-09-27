import FavouritesService from "../services/FavouritesService.js";

class FavouritesController {
    async get_favourites(req, res, next) {
        try {
            await FavouritesService.add_favourite(
                req.user,
                req.params.post_id
            );

            return res.status(201).send();
        }
        catch (error) {
            next(error);
        }
    }

    async add_favourite(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }

    async delete_favourite(req, res, next) {
        try {

        }
        catch (error) {
            next(error);
        }
    }
}

export default new FavouritesController();

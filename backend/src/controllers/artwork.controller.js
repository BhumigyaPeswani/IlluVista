const ArtworkService = require('../services/artwork.service');
const ApiResponse = require('../utils/response');

class ArtworkController {
    async index(req, res, next) {
        try {
            const artworks = await ArtworkService.getAllArtworks(req.query);
            return ApiResponse.success(res, artworks);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const artwork = await ArtworkService.getArtworkById(req.params.id);
            return ApiResponse.success(res, artwork);
        } catch (error) {
            if (error.message === 'Artwork not found') {
                return ApiResponse.error(res, error.message, 404);
            }
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const artwork = await ArtworkService.createArtwork(req.body, req.user.userId);
            return ApiResponse.created(res, artwork);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const artwork = await ArtworkService.updateArtwork(req.params.id, req.body, req.user.userId);
            return ApiResponse.success(res, artwork);
        } catch (error) {
            if (error.message === 'Artwork not found') return ApiResponse.error(res, error.message, 404);
            if (error.message === 'Unauthorized') return ApiResponse.error(res, error.message, 403);
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await ArtworkService.deleteArtwork(req.params.id, req.user.userId);
            return ApiResponse.success(res, null, 'Artwork deleted successfully');
        } catch (error) {
            if (error.message === 'Artwork not found') return ApiResponse.error(res, error.message, 404);
            if (error.message === 'Unauthorized') return ApiResponse.error(res, error.message, 403);
            next(error);
        }
    }
}

module.exports = new ArtworkController();

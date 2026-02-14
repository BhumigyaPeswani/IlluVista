const Artwork = require('../models/Artwork');

class ArtworkService {
    async getAllArtworks({ category }) {
        let query = {};
        if (category) query = { category };

        // Optimizations: Use lean() for read-only, populate necessary fields
        return Artwork.find(query)
            .populate('artistId', 'name')
            .sort({ createdAt: -1 })
            .lean();
    }

    async getArtworkById(id) {
        const artwork = await Artwork.findById(id).populate('artistId', 'name').lean();
        if (!artwork) {
            throw new Error('Artwork not found');
        }
        return artwork;
    }

    async createArtwork(data, artistId) {
        // Additional business logic (e.g., check plan limits) can go here
        return Artwork.create({
            ...data,
            artistId,
        });
    }

    async updateArtwork(id, data, userId) {
        const artwork = await Artwork.findById(id);
        if (!artwork) {
            throw new Error('Artwork not found');
        }

        if (artwork.artistId.toString() !== userId) {
            throw new Error('Unauthorized');
        }

        Object.assign(artwork, data);
        return artwork.save();
    }

    async deleteArtwork(id, userId) {
        const artwork = await Artwork.findById(id);
        if (!artwork) {
            throw new Error('Artwork not found');
        }

        if (artwork.artistId.toString() !== userId) {
            throw new Error('Unauthorized');
        }

        return Artwork.deleteOne({ _id: id });
    }
}

module.exports = new ArtworkService();

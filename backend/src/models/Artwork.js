const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Artwork title is required'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            index: true,
        },
        imageUrl: {
            type: String,
            required: [true, 'Image URL is required'],
        },
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Artist ID is required'],
            index: true,
        },
        status: {
            type: String,
            enum: ['listed', 'sold', 'hidden'],
            default: 'listed',
            index: true,
        },
    },
    { timestamps: true }
);

ArtworkSchema.index({ title: 'text', description: 'text' });
ArtworkSchema.index({ price: 1, createdAt: -1 }); // Optimize sort by price
ArtworkSchema.index({ status: 1, createdAt: -1 }); // Optimize filtering listed items

module.exports = mongoose.models.Artwork || mongoose.model('Artwork', ArtworkSchema);

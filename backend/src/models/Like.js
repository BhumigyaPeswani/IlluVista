const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema(
    {
        artworkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
            required: [true, 'Artwork ID is required'],
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },
    },
    { timestamps: true }
);

// Prevent duplicate likes from the same user on the same artwork
LikeSchema.index({ artworkId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.models.Like || mongoose.model('Like', LikeSchema);

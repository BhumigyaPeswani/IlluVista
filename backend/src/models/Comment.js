const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        artworkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
            required: [true, 'Artwork ID is required'],
            index: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },
        commentText: {
            type: String,
            required: [true, 'Comment text is required'],
            trim: true,
            maxlength: [1000, 'Comment cannot be more than 1000 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'flagged'],
            default: 'approved',
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);

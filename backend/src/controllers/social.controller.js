const Like = require('../models/Like');
const Comment = require('../models/Comment');
const ApiResponse = require('../utils/response');

class SocialController {
    // Like System
    async toggleLike(req, res, next) {
        try {
            const { id } = req.params; // Artwork ID
            const userId = req.user.userId;

            const existingLike = await Like.findOne({ artworkId: id, userId });

            if (existingLike) {
                await Like.deleteOne({ _id: existingLike._id });
                const count = await Like.countDocuments({ artworkId: id });
                return ApiResponse.success(res, { liked: false, count }, 'Unliked successfully');
            } else {
                await Like.create({ artworkId: id, userId });
                const count = await Like.countDocuments({ artworkId: id });
                return ApiResponse.success(res, { liked: true, count }, 'Liked successfully');
            }
        } catch (error) {
            next(error);
        }
    }

    async getLikes(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.user ? req.user.userId : null;

            const count = await Like.countDocuments({ artworkId: id });
            let iLiked = false;

            if (userId) {
                const like = await Like.findOne({ artworkId: id, userId });
                iLiked = !!like;
            }

            return ApiResponse.success(res, { count, iLiked });
        } catch (error) {
            next(error);
        }
    }

    // Comment System
    async createComment(req, res, next) {
        try {
            const { id } = req.params; // Artwork ID
            const { commentText, parentId } = req.body;
            const userId = req.user.userId;

            const comment = await Comment.create({
                artworkId: id,
                userId,
                commentText,
                parentId: parentId || null,
            });

            // Populate user details for immediate display
            await comment.populate('userId', 'name avatar profileImage');

            return ApiResponse.created(res, comment);
        } catch (error) {
            next(error);
        }
    }

    async getComments(req, res, next) {
        try {
            const { id } = req.params;

            const comments = await Comment.find({ artworkId: id })
                .populate('userId', 'name avatar profileImage')
                .sort({ createdAt: -1 }) // Newest first
                .lean();

            // Structure comments into threads
            const commentMap = {};
            const rootComments = [];

            // First pass: Index all comments
            comments.forEach(comment => {
                comment.replies = [];
                commentMap[comment._id] = comment;
            });

            // Second pass: Build hierarchy
            comments.forEach(comment => {
                if (comment.parentId) {
                    const parent = commentMap[comment.parentId];
                    if (parent) {
                        parent.replies.push(comment); // Add to parent's replies
                        // Sort replies oldest to newest
                        parent.replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    }
                } else {
                    rootComments.push(comment);
                }
            });

            return ApiResponse.success(res, rootComments);
        } catch (error) {
            next(error);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const { id } = req.params; // Comment ID
            const userId = req.user.userId;

            const comment = await Comment.findById(id);
            if (!comment) {
                return ApiResponse.error(res, 'Comment not found', 404);
            }

            // Allow user to delete their own comment, or admin to delete any
            if (comment.userId.toString() !== userId && req.user.role !== 'ADMIN') {
                return ApiResponse.error(res, 'Unauthorized', 403);
            }

            await Comment.deleteOne({ _id: id });
            // Optionally delete replies or mark them as deleted
            await Comment.deleteMany({ parentId: id });

            return ApiResponse.success(res, null, 'Comment deleted successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SocialController();

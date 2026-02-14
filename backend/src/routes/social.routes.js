const express = require('express');
const router = express.Router();
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');
const SocialController = require('../controllers/social.controller');

// Likes
router.post('/artworks/:id/like', authenticate, SocialController.toggleLike);
router.get('/artworks/:id/like', optionalAuth, SocialController.getLikes);

// Comments
router.get('/artworks/:id/comments', SocialController.getComments);
router.post('/artworks/:id/comments', authenticate, SocialController.createComment);
router.delete('/comments/:id', authenticate, SocialController.deleteComment);

module.exports = router;

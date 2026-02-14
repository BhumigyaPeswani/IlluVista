const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const ArtworkController = require('../controllers/artwork.controller');

// GET /api/artworks — Public: Get all artworks
router.get('/', ArtworkController.index);

// GET /api/artworks/:id — Public: Get single artwork
router.get('/:id', ArtworkController.show);

// POST /api/artworks — Auth required: Create artwork
router.post('/', authenticate, authorize('ARTIST', 'ADMIN'), ArtworkController.create);

// PUT /api/artworks/:id — Auth required: Update artwork
router.put('/:id', authenticate, authorize('ARTIST', 'ADMIN'), ArtworkController.update);

// DELETE /api/artworks/:id — Auth required: Delete artwork
router.delete('/:id', authenticate, authorize('ARTIST', 'ADMIN'), ArtworkController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const OrderController = require('../controllers/order.controller');

// GET /api/orders — Auth required: Get current user's orders
router.get('/', authenticate, OrderController.index);

// GET /api/orders/:id — Auth required: Get specific order
router.get('/:id', authenticate, OrderController.show);

// POST /api/orders — Auth required: Create a new order
router.post('/', authenticate, OrderController.create);

// PATCH /api/orders/:id/status — Auth required: Update order status
router.patch('/:id/status', authenticate, OrderController.updateStatus);

module.exports = router;

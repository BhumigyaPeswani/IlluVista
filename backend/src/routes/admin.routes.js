const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Artwork = require('../models/Artwork');
const Order = require('../models/Order');
const { authenticate, authorize } = require('../middleware/auth');

// All admin routes require auth + ADMIN role
router.use(authenticate);
router.use(authorize('ADMIN'));

// GET /api/admin/stats — Dashboard stats
router.get('/stats', async (req, res) => {
    try {
        const [userCount, artworkCount, orderCount] = await Promise.all([
            User.countDocuments(),
            Artwork.countDocuments(),
            Order.countDocuments(),
        ]);

        // Calculate total revenue from completed orders
        const revenueResult = await Order.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: '$price' } } },
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;

        return res.json({
            users: userCount,
            artworks: artworkCount,
            orders: orderCount,
            revenue: totalRevenue,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/users — List all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/orders — All orders
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('buyerId', 'name email')
            .populate('artworkId', 'title imageUrl')
            .sort({ createdAt: -1 });
        return res.json(orders);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// GET /api/admin/artworks — All artworks for moderation
router.get('/artworks', async (req, res) => {
    try {
        const artworks = await Artwork.find()
            .populate('artistId', 'name email')
            .sort({ createdAt: -1 });
        return res.json(artworks);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// PATCH /api/admin/artworks/:id/status — Change artwork status
router.patch('/artworks/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['listed', 'sold', 'hidden'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const artwork = await Artwork.findByIdAndUpdate(
            req.params.id,
            { status },
            { returnDocument: 'after' }
        );

        if (!artwork) {
            return res.status(404).json({ error: 'Artwork not found' });
        }

        return res.json(artwork);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;

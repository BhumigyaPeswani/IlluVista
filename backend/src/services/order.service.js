const Order = require('../models/Order');

class OrderService {
    async getOrdersByBuyer(buyerId) {
        return Order.find({ buyerId })
            .populate('artworkId')
            .populate('artistId', 'name')
            .sort({ createdAt: -1 });
    }

    async getOrderById(id, userId, role) {
        const order = await Order.findById(id)
            .populate('artworkId')
            .populate('artistId', 'name');

        if (!order) {
            throw new Error('Order not found');
        }

        if (order.buyerId.toString() !== userId && role !== 'ADMIN') {
            throw new Error('Unauthorized');
        }

        return order;
    }

    async createOrder(data, buyerId) {
        return Order.create({
            ...data,
            buyerId,
        });
    }

    async updateOrderStatus(id, status) {
        const order = await Order.findByIdAndUpdate(
            id,
            { paymentStatus: status },
            { returnDocument: 'after' }
        );

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }
}

module.exports = new OrderService();

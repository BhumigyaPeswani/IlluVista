const OrderService = require('../services/order.service');
const ApiResponse = require('../utils/response');

class OrderController {
    async index(req, res, next) {
        try {
            const orders = await OrderService.getOrdersByBuyer(req.user.userId);
            return ApiResponse.success(res, orders);
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const order = await OrderService.getOrderById(req.params.id, req.user.userId, req.user.role);
            return ApiResponse.success(res, order);
        } catch (error) {
            if (error.message === 'Order not found') {return ApiResponse.error(res, error.message, 404);}
            if (error.message === 'Unauthorized') {return ApiResponse.error(res, error.message, 403);}
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const order = await OrderService.createOrder(req.body, req.user.userId);
            return ApiResponse.created(res, order);
        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req, res, next) {
        try {
            const order = await OrderService.updateOrderStatus(req.params.id, req.body.status);
            return ApiResponse.success(res, order);
        } catch (error) {
            if (error.message === 'Order not found') {return ApiResponse.error(res, error.message, 404);}
            next(error);
        }
    }
}

module.exports = new OrderController();

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        artworkId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artwork',
            required: [true, 'Artwork ID is required'],
            index: true,
        },
        buyerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Buyer ID is required'],
            index: true,
        },
        artistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Artist ID is required'],
            index: true,
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'paid', 'failed'],
            default: 'pending',
            index: true,
        },
        paymentIntentId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    { timestamps: true }
);

OrderSchema.index({ buyerId: 1, createdAt: -1 }); // Buyer's order history
OrderSchema.index({ artistId: 1, createdAt: -1 }); // Artist's sales history
OrderSchema.index({ artistId: 1, status: 1 }); // Artist's dashboard filtering


module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);

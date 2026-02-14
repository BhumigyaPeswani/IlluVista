const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: ['subscription', 'order_payment', 'payout', 'refund'],
            required: true,
        },
        amount: { type: Number, required: true }, // In cents
        currency: { type: String, default: 'USD' },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'refunded'],
            default: 'pending',
        },
        referenceId: { type: String, index: true }, // OrderID or SubscriptionID
        description: String,
        stripePaymentIntentId: String,
        metadata: { type: Map, of: String },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

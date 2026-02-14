const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User ID is required'],
            index: true,
        },
        type: {
            type: String,
            enum: ['comment', 'sale', 'system'],
            required: [true, 'Notification type is required'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
            trim: true,
        },
        isRead: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true, uppercase: true }, // FREE, PRO
        price: { type: Number, required: true }, // In cents
        currency: { type: String, default: 'USD' },
        interval: { type: String, enum: ['month', 'year'], default: 'month' },
        stripePriceId: { type: String }, // For paid plans
        limits: {
            uploads: { type: Number, default: 5 }, // -1 for unlimited
        },
        features: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);

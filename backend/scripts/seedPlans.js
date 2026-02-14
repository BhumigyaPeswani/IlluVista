const mongoose = require('mongoose');
const Plan = require('../models/Plan');
const dbConnect = require('../lib/dbConnect');
const dotenv = require('dotenv');

dotenv.config();

const plans = [
    {
        name: 'Free Artist',
        slug: 'FREE',
        price: 0,
        limits: { uploads: 5 },
        features: ['5 Artwork Uploads', 'Basic Analytics', 'Standard Support']
    },
    {
        name: 'Pro Artist',
        slug: 'PRO',
        price: 1500, // $15.00
        stripePriceId: process.env.STRIPE_PRICE_ID_PRO, // Needs to be set in .env
        limits: { uploads: -1 }, // Unlimited
        features: ['Unlimited Uploads', 'Priority Support', 'Advanced Analytics', 'Zero Commission (Optional)']
    }
];

async function seedPlans() {
    try {
        await dbConnect();
        console.log('Connected to DB...');

        for (const plan of plans) {
            const existing = await Plan.findOne({ slug: plan.slug });
            if (!existing) {
                await Plan.create(plan);
                console.log(`Created plan: ${plan.name}`);
            } else {
                console.log(`Plan exists: ${plan.name}`);
            }
        }
        console.log('Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seedPlans();

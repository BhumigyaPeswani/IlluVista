const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
    } else {
        console.warn('STRIPE_SECRET_KEY is missing. Stripe features will not work.');
    }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
    apiVersion: '2023-10-16', // Use latest stable version
});

module.exports = stripe;

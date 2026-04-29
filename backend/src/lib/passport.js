const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_secret',
    callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // Find existing user by email
        let user = await User.findOne({ email: profile.emails[0].value });
        
        // Read role from state parameter passed from frontend
        // For passport-google-oauth20, req.query.state contains the state string
        const role = req.query.state || 'BUYER';
        
        if (!user) {
            // Create a new user with the specified role
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10), // Random placeholder password
                role: ['BUYER', 'ARTIST'].includes(role) ? role : 'BUYER',
                profileImage: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
                isEmailVerified: true
            });
        }
        
        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

module.exports = passport;

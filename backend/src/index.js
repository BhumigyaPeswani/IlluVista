const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const dbConnect = require('./lib/dbConnect');
const { errorHandler } = require('./middleware/errorHandler');
const { limiter, authLimiter } = require('./middleware/security');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(require('compression')()); // Compress all responses
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Initialize Passport
const passport = require('./lib/passport');
app.use(passport.initialize());
// Global Rate Limiting
app.use('/api', limiter);

// Routes
const authRoutes = require('./routes/auth.routes');
const authRecoveryRoutes = require('./routes/auth-recovery.routes');
const artworkRoutes = require('./routes/artwork.routes');
const orderRoutes = require('./routes/order.routes');
const adminRoutes = require('./routes/admin.routes');
const socialRoutes = require('./routes/social.routes');

// Mount routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/auth', authLimiter, authRecoveryRoutes); // Mount recovery routes under same prefix
app.use('/api/artworks', artworkRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', socialRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('hello from the backend');
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'ok', message: 'IlluVista API is running' });
});

// 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

// Global error handler — MUST be last
app.use(errorHandler);

// Connect to DB and start server
async function startServer() {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log(`🚀 Backend server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

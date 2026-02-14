const { verifyAccessToken } = require('../lib/token');

const authenticate = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies['auth-token']) {
            token = req.cookies['auth-token'];
        }

        if (!token) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        const payload = await verifyAccessToken(token);

        if (!payload || typeof payload.userId !== 'string') {
            return res.status(401).json({ success: false, error: 'Invalid or expired token' });
        }

        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Authentication failed' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: 'Not authorized to access this route' });
        }

        next();
    };
};

const optionalAuth = async (req, res, next) => {
    try {
        let token;
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies['auth-token']) {
            token = req.cookies['auth-token'];
        }

        if (token) {
            const payload = await verifyAccessToken(token);
            if (payload && typeof payload.userId === 'string') {
                req.user = payload;
            }
        }
        next();
    } catch (error) {
        next(); // Ignore errors, just proceed without user
    }
};

module.exports = { authenticate, authorize, optionalAuth };

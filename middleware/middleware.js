const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    // Check for the token in the Authorization header (Bearer Token)
    const token = req.header('Authorization')?.split(' ')[1]; // Get token after "Bearer"

    // Alternatively, you can get the token from cookies:
    // const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        // Verify token with the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user info to the request object
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Token verification failed', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
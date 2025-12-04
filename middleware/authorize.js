// src/middleware/authorize.js

const jwt = require('jsonwebtoken');

/**
 * Middleware to authorize users based on role.
 * It verifies the JWT and checks if the user's role_id matches the required role.
 *
 * @param {number[]} requiredRoleIds - An array of role_ids that are allowed to access the route.
 */
const authorize = (requiredRoleIds) => (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret from your environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if the user's role is one of the required roles
        if (!requiredRoleIds.includes(decoded.role_id)) {
            return res.status(403).json({ message: 'Forbidden. You do not have the required permissions.' });
        }

        // Attach user information to the request object for later use
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authorize;
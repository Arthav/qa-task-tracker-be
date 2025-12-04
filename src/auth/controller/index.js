const db = require('../../services/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_EXPIRES_IN } = require('../../config');

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 'error', message: 'Email and password are required' });
        }

        // Find user by email
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = rows[0];

        if (!user) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: TOKEN_EXPIRES_IN }
        );

        // Remove password from response
        delete user.password;

        res.status(200).json({
            status: 'success',
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

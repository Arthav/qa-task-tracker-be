const db = require('../../services/db');

exports.getUsers = async (req, res, next) => {
    try {
        const { role } = req.query;
        let query = 'SELECT * FROM users';
        const params = [];

        if (role) {
            query += ' WHERE role = $1';
            params.push(role);
        }

        const { rows } = await db.query(query, params);
        res.status(200).json({ status: 'success', data: rows });
    } catch (error) {
        next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.status(200).json({ status: 'success', data: rows[0] });
    } catch (error) {
        next(error);
    }
};

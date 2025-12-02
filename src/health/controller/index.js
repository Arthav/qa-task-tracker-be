
const pool = require('../../../services/db');
const crypto = require("crypto");

module.exports.getStatus = (req, res) => {
    res.status(200).json({ healthy: true });
};

module.exports.getDBStatus = async (req, res) => {
    const query = 'SELECT 1 AS result';
    try {
        const { rows } = await pool.query(query);
        res.status(200).json({ result: rows[0].result, healthy: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: null, healthy: false });
    }
};

module.exports.generateJwt = async (req, res) => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    res.status(200).json({ secretKey: secretKey });
};
require('dotenv').config();

const config = {
    port: 5000,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
    JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = config;
require('dotenv').config();

const config = {
    port: 5000,
    TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
};

module.exports = config;
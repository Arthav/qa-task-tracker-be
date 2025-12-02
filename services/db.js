
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

console.log("Using PostgreSQL connection string:", connectionString);

const pool = new Pool({ connectionString });

module.exports = pool;
const { createPool } = require("mysql");
require("dotenv/config");

module.exports = connection = createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});
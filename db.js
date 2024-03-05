const { Sequelize } = require("sequelize");

const env = process.env;
const sequelize = new Sequelize({
  dialect: env.DB_DIALECT,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  quoteIdentifiers: false,
  models: [__dirname + "/models"],
  logging: false,
});

module.exports = sequelize;

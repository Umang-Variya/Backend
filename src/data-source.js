var typeorm = require("typeorm")

require("dotenv").config();

const AppDataSource = new typeorm.DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [require("./entity/users.entity"),require("./entity/data.entity"),require("./entity/state.entity")],
  migrations: [],
  subscribers: [],
});

module.exports = {AppDataSource}
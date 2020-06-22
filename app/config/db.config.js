module.exports = {
  HOST: "localhost",
  USER: "test_user",
  PASSWORD: "duente2102",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
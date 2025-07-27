export default {
  development: {
    username: "postgres",
    password: "postgres",
    database: "ecommerce",
    host: "ecommerce_db",
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "postgres",
    password: "postgres",
    database: "ecommerce",
    host: "ecommerce_db",
    dialect: "postgres"
  }
}

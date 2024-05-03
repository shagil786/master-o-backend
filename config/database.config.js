const fs = require("fs");

const sslOptions = {
  // Provide the path to your SSL certificate file
  ca: fs.readFileSync("/Users/cepl/code/master-o-backend/ca.pem"), // Combined SSL certificate file
};

module.exports = {
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DBPORT,
  ssl: sslOptions,
};

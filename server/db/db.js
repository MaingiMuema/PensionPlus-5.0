const mysql = require("mysql");

const connectdb = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "pensionplus",
});

connectdb.connect((err) => {
  if (err) throw err;
  console.log("Database connection established!");
});

module.exports = connectdb;

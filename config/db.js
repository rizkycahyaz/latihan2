let mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "latihan02",
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("koneksi berhasil");
  }
});

module.exports = connection;

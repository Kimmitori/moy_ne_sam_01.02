const mysql = require("mysql2");
const db = mysql.createPool({
    contentionLimit: 5,
    host: "localhost",
    user: "root",
    database: "moy_ne_sam_db1",
    password: "Admin123"
}).promise();

module.exports = db;
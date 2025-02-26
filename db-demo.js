// Get the client
const mysql = require('mysql2');

// Create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'publisher_community',
  dateStrings: true,
});

// A simple SELECT query
connection.query('SELECT * FROM `users` ', function (err, results, fields) {
  let { id, password, email, created_at } = results[0];
  console.log(id, password, email, created_at);
});

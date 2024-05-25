const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'cours'
  });

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

connection.queryPromise = (query, values) => {
  return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
  });
};

module.exports = connection;

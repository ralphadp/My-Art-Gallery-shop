const mysql = require('mysql');

//Config DB
const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    user: 'root',
    password: 'root',
    database: process.env.MYSQL_DATABASE || 'gallery'
  };

//Create connection
const connection = mysql.createConnection(config);
  
//Connect to database
connection.connect((err) =>{
  if (err) {
      console.log('Mysql Connection error...\n');
      throw err;
  }
  console.log('Mysql Connected...\n');
  console.log('Connected with:',  config);
});

module.exports = connection;
import mysql from 'mysql2';

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',              
  password: '',              
  database: 'slu_alumina'   
});

dbConnection.connect((error) => {
  if (error) {
    console.error('Error establishing DB connection:', error);
    return;
  }
  console.log('DB connection established');
});

export default dbConnection;

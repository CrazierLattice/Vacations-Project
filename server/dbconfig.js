require('dotenv').config()
const mysql = require('mysql2');

  class Adapter {
  static db_config = {
    host:process.env.DB_HOST_LOCAL,
    user:process.env.DB_USER_LOCAL,
    database:process.env.DB_DATABASE_LOCAL
}
  static connectToDatabase = () => {
    console.log('Attemping to connect to database');
    const connection = mysql.createConnection(this.db_config);
    connection.connect((error,a) => {
      if (error) {
        console.log(`Failed to connect to database, Error: ${error}, Attempting to reconnect.`);
        setTimeout(this.connectToDatabase, 2000);
      } else {
        console.log(`Connected successfully, ${JSON.stringify(a)}`);
      }

    })
    return connection;
  }
  static handleDisconnect = (errorCode) => {
    errorCode === "PROTOCOL_CONNECTION_LOST" ?? this.connectToDatabase()
  }


  static singleQuery = (queryString, values, callback) => {
    console.log(values, callback);
    const connection = this.connectToDatabase();
    connection.query(queryString, values, (error, results) => {
      if (error) {
        console.log(`Error executing query: ${error}`);
        callback(error, null);
        return;
      }
      callback(null, results);
      connection.end();
    });
  };


}
  

// const Query = (q,...values) =>{
//     return new Promise((resolve,reject)=>{
//         connection.query(q,values,(err,results)=>{
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(results)
//             }
//         })
//     })
// }

module.exports = Adapter;
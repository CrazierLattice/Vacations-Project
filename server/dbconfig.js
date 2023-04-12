require('dotenv').config()
const mysql = require('mysql2');
const mysql2 = require('mysql2/promise')

class Adapter {
  static db_config = {
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER_LOCAL,
    database: process.env.DB_DATABASE_LOCAL
  }
  static connectToDatabase = () => {
    console.log('Attemping to connect to database');
    const connection = mysql.createConnection(this.db_config);
    connection.connect((error, result) => {
      if (error) {
        console.log(`Failed to connect to database, Error: ${error}, Attempting to reconnect.`);
        setTimeout(this.connectToDatabase, 2000);
      } else {
        console.log("Connected successfully");
      }

    })
    return connection;
  }

  static connectToDatabase2 = async () => {
      const connection = await mysql2.createConnection(this.db_config);
      return connection;
  }
  static handleDisconnect = (errorCode) => {
    errorCode === "PROTOCOL_CONNECTION_LOST" ?? this.connectToDatabase()
  }


  static singleQuery = (queryString, values, callback) => {
    const connection = this.connectToDatabase();
    connection.query(queryString, values, (error, results) => {
      if (error) {
        throw new Error(error)
      }
      callback(null, results);
      connection.end();
    });
  };

  static newSingleQuery = async (query) => {
      const connecttion = await this.connectToDatabase2();
     const [rows] = await connecttion.execute(query);
     connecttion.end();
     return rows;
  }


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
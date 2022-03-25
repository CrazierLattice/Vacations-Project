require('dotenv').config()
const mysql = require('mysql');
const db_config = {
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
}

//Recursive function that handles when the server disconnects on production.
function handleDisconnect() {
    connection = mysql.createConnection(db_config);
  
    connection.connect(function (err) {
      if (err) {
        console.log("error when connecting to db:", err);
        setTimeout(handleDisconnect, 2000);
      }
    });
  
    connection.on("error", function (err) {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleDisconnect();
      } else {
        throw err;
      }
    });
  }

  handleDisconnect();
  

const Query = (q,...values) =>{
    return new Promise((resolve,reject)=>{
        connection.query(q,values,(err,results)=>{
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = {connection,Query}
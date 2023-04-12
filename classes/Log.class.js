require('dotenv').config()
const fs = require("fs");
const path = require("path");

class Log {

  static logData(file, functionName, text) {
    const LOGS_DIRECTORY = process.env.LOG_DIRECTORY 
    if (!fs.existsSync(LOGS_DIRECTORY)) {
      fs.mkdirSync(LOGS_DIRECTORY);
    }
    const date = new Date();
    const dateString = date.toISOString().split("T")[0];
    const fullDateAndTime = date.toISOString().slice(0, 19).replace('T', ' ');
    const fileName = `VacationLogs_${dateString}_${date.getHours()}.csv`;
    const fullPath = LOGS_DIRECTORY + fileName;
    let fileData = "";
    console.log(fullPath);

    if (fs.existsSync(fullPath)) {
      fileData = fs.readFileSync(fullPath).toString();
    }
    file = path.basename(file);
    const log = `${fullDateAndTime}|${file}|${functionName}|${text}\n`;
    fileData += log;
    fs.writeFileSync(fullPath, fileData);
  }
}

module.exports = Log;

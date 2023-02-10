require('dotenv').config()
const path = require("path");
class Log {
  static logsDirectory = process.env.LOG_DIRECTORY;

  static logData(file, functionName, text) {
    const fs = require("fs");
    const date = new Date();
    const dateString = date.toISOString().split("T")[0];
    const fullDateAndTime = date.toISOString().slice(0, 19).replace('T', ' ');
    const fileName = `VacationLogs_${dateString}_${date.getHours()}.csv`;
    const fullPath = this.logsDirectory + fileName;
    let fileData = "";

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

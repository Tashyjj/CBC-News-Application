const fs = require('fs');
const path = require('path');

const logMiddleware = (req, res, next) => {
    const logFilePath = path.join(__dirname, '../log.txt');

    const dateTime = new Date().toISOString();
    const requestPath = req.path;
    const ipAddress = req.ip;
    const queryParams = JSON.stringify(req.query);
    const requestBody = JSON.stringify(req.body);

    const logLine = `${dateTime},${requestPath},${ipAddress},${queryParams},${requestBody}\n`;

    fs.appendFile(logFilePath, logLine, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });

    next();
};

module.exports = logMiddleware;
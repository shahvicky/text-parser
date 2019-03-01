const winston = require('winston');
require('winston-daily-rotate-file');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.DailyRotateFile) ({
      json: true,
      dirname:'./logs',
      filename:'backend-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      colorize: true,
      level: 'debug'
    })
  ],
  exceptionHandlers: [
    new winston.transports.File({
      json: true,
      dirname:'./logs',
      filename: 'exception-backend.log',
      datePattern: 'YYYY-MM-DD',
      colorize: true
    })
  ]
});

module.exports = logger;

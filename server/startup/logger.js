const { format, createLogger, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "error",
      level: "info",
      format: format.combine(format.timestamp(), format.simple()),
      handleExceptions: true,
      prettyprint: true,
    }),
    new transports.File({
      filename: "errors.log",
      level: "error",
      format: format.combine(format.timestamp(), format.json()),
      handleExceptions: true,
      
    }),
  ],
});

module.exports = logger;

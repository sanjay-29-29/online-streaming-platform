import { createLogger, format, transports } from 'winston';
import winston from 'winston/lib/winston/config';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
  log: 'cyan'
});

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    customFormat
  ),
  transports: [
    new transports.Console({
      format: printf(({ level, message, timestamp, stack }) => {
        return stack
          ? `${timestamp} [${level}]: ${message}  \nStack Trace:  ${stack}`
          : `${timestamp} [${level}]: ${message}`;
      })
    })
  ]
});

export default logger;

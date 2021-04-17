import { createLogger, format, transports } from 'winston';

const logger = (meta: string) => {
  return createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json(),
    ),
    defaultMeta: { service: 'channels-' + meta },
    transports: [
      new transports.File({ filename: './logs/info.log', level: 'info' }),
      new transports.File({ filename: './logs/error.log', level: 'error' }),
    ],
  });
};

logger('').add(
  new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  }),
);

export { logger };

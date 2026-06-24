import { logEvent } from './logger.js';

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  logEvent(`ERROR ${status} on ${req.method} ${req.originalUrl}: ${err.message}`);

  res.status(status).json({
    error: err.message || 'Wewnętrzny błąd serwera',
  });
}

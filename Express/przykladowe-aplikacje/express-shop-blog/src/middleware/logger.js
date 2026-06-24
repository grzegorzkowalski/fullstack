import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve('src/logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Tworzymy folder logs/, jeśli jeszcze nie istnieje
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function appendToLog(line) {
  const timestamp = new Date().toISOString();
  fs.appendFile(LOG_FILE, `[${timestamp}] ${line}\n`, (err) => {
    if (err) console.error('Błąd zapisu logu:', err);
  });
}

// Middleware logujące każde żądanie HTTP
export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    appendToLog(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });

  next();
}

// Funkcja do manualnego logowania zdarzeń (np. logowanie użytkownika, błędy biznesowe)
export function logEvent(message) {
  appendToLog(`EVENT: ${message}`);
}

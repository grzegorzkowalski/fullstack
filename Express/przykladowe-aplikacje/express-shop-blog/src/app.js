import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/auth.routes.js';
import produktyRouter from './routes/produkty.routes.js';
import artykulyRouter from './routes/artykuly.routes.js';

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true, // pozwala na przesyłanie i odbieranie cookies
};

app.use(cors(corsOptions));
app.use(requestLogger); // logowanie musi być jak najwcześniej w łańcuchu middleware
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    message: 'Express Shop & Blog API',
    endpointy: [
      'POST /api/auth/login',
      'POST /api/auth/logout',
      'GET  /api/auth/me (wymaga zalogowania)',
      'GET  /api/produkty (wymaga zalogowania)',
      'POST /api/produkty (publiczny)',
      'GET  /api/artykuly (publiczny)',
      'POST /api/artykuly (publiczny)',
    ],
  });
});

app.use('/api/auth', authRouter);
app.use('/api/produkty', produktyRouter);
app.use('/api/artykuly', artykulyRouter);

// 404 dla nieznanych adresów
app.use((req, res) => {
  res.status(404).json({ error: 'Nie znaleziono adresu' });
});

app.use(errorHandler); // zawsze na końcu

export default app;

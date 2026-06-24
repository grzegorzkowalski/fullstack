import jwt from 'jsonwebtoken';
import { logEvent } from '../middleware/logger.js';

export function login(req, res) {
  const { login, haslo } = req.body;

  const validLogin = login === process.env.ADMIN_USER;
  const validPassword = haslo === process.env.ADMIN_PASSWORD;

  if (!validLogin || !validPassword) {
    logEvent(`Nieudane logowanie dla loginu: ${login}`);
    return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
  }

  const token = jwt.sign({ login }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true, // niedostępne z JavaScriptu w przeglądarce — chroni przed XSS
    secure: false, // ustaw na true w produkcji (wymaga HTTPS)
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000, // 1 godzina
  });

  logEvent(`Zalogowano użytkownika: ${login}`);

  // Token zwracamy też w body — frontend (np. Next.js) może go zapisać
  // u siebie i ręcznie dołączać w nagłówku Authorization do kolejnych żądań.
  res.json({ message: 'Zalogowano pomyślnie', token });
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Wylogowano' });
}

export function me(req, res) {
  // req.user jest dostępne, jeśli żądanie przeszło przez middleware requireAuth
  res.json({ user: req.user });
}

import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, me); // dodatkowy endpoint pomocniczy do sprawdzenia sesji

export default router;

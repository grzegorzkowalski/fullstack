import { Router } from 'express';
import { listArtykuly, createArtykul } from '../controllers/artykuly.controller.js';
import { validate } from '../middleware/validate.js';
import { artykulSchema } from '../validators/artykul.schema.js';

const router = Router();

// Wszystkie endpointy artykułów są publiczne (allow anonymous)
router.get('/', listArtykuly);
router.post('/', validate(artykulSchema), createArtykul);

export default router;

import { Router } from 'express';
import { listProdukty, createProdukt } from '../controllers/produkty.controller.js';
import { validate } from '../middleware/validate.js';
import { produktSchema } from '../validators/produkt.schema.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listProdukty); // wymaga zalogowania (cookie z JWT)
router.post('/', validate(produktSchema), createProdukt); // allow anonymous

export default router;

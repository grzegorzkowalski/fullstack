import { getAllProdukty, addProdukt } from '../services/produkty.service.js';

export async function listProdukty(req, res, next) {
  try {
    const produkty = await getAllProdukty();
    res.json(produkty);
  } catch (err) {
    next(err);
  }
}

export async function createProdukt(req, res, next) {
  try {
    // req.body jest już zwalidowane przez middleware validate(produktSchema)
    const nowyProdukt = await addProdukt(req.body);
    res.status(201).json(nowyProdukt);
  } catch (err) {
    next(err);
  }
}

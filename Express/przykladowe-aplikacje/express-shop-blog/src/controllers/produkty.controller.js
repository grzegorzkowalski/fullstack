import { getAllProdukty, addProdukt } from '../services/produkty.service.js';

export function listProdukty(req, res, next) {
  try {
    res.json(getAllProdukty());
  } catch (err) {
    next(err);
  }
}

export function createProdukt(req, res, next) {
  try {
    // req.body jest już zwalidowane przez middleware validate(produktSchema)
    const nowyProdukt = addProdukt(req.body);
    res.status(201).json(nowyProdukt);
  } catch (err) {
    next(err);
  }
}

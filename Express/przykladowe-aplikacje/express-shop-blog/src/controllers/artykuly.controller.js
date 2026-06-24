import { getAllArtykuly, addArtykul } from '../services/artykuly.service.js';

export function listArtykuly(req, res, next) {
  try {
    res.json(getAllArtykuly());
  } catch (err) {
    next(err);
  }
}

export function createArtykul(req, res, next) {
  try {
    // req.body jest już zwalidowane przez middleware validate(artykulSchema)
    const nowyArtykul = addArtykul(req.body);
    res.status(201).json(nowyArtykul);
  } catch (err) {
    next(err);
  }
}

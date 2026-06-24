import { getAllArtykuly, addArtykul } from '../services/artykuly.service.js';

export async function listArtykuly(req, res, next) {
  try {
    const artykuly = await getAllArtykuly();
    res.json(artykuly);
  } catch (err) {
    next(err);
  }
}

export async function createArtykul(req, res, next) {
  try {
    // req.body jest już zwalidowane przez middleware validate(artykulSchema)
    const nowyArtykul = await addArtykul(req.body);
    res.status(201).json(nowyArtykul);
  } catch (err) {
    next(err);
  }
}

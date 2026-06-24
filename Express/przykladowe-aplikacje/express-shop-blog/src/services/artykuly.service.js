import { artykuly } from '../data/artykuly.data.js';

export function getAllArtykuly() {
  return artykuly;
}

export function addArtykul({ tytul, tresc }) {
  const nowyArtykul = {
    id: artykuly.length > 0 ? Math.max(...artykuly.map((a) => a.id)) + 1 : 1,
    tytul,
    tresc,
  };
  artykuly.push(nowyArtykul);
  return nowyArtykul;
}

import { produkty } from '../data/produkty.data.js';

export function getAllProdukty() {
  return produkty;
}

export function addProdukt({ nazwa, cena }) {
  const nowyProdukt = {
    id: produkty.length > 0 ? Math.max(...produkty.map((p) => p.id)) + 1 : 1,
    nazwa,
    cena,
  };
  produkty.push(nowyProdukt);
  return nowyProdukt;
}

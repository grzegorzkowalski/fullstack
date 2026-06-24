import { prisma } from '../lib/prisma.js';

export async function getAllProdukty() {
  return prisma.produkt.findMany({ orderBy: { id: 'asc' } });
}

export async function addProdukt({ nazwa, cena }) {
  return prisma.produkt.create({ data: { nazwa, cena } });
}

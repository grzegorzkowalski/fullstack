import { prisma } from '../lib/prisma.js';

export async function getAllArtykuly() {
  return prisma.artykul.findMany({ orderBy: { id: 'asc' } });
}

export async function addArtykul({ tytul, tresc }) {
  return prisma.artykul.create({ data: { tytul, tresc } });
}

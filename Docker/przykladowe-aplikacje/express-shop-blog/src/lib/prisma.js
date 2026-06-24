import { PrismaClient } from '@prisma/client';

// Jeden, współdzielony klient Prisma dla całej aplikacji.
export const prisma = new PrismaClient();

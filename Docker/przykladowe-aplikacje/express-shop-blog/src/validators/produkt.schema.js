import { z } from 'zod';

export const produktSchema = z.object({
  nazwa: z.string().min(2, 'Nazwa musi mieć co najmniej 2 znaki'),
  cena: z.number().positive('Cena musi być liczbą większą od 0'),
});

import { z } from 'zod';

export const artykulSchema = z.object({
  tytul: z.string().min(3, 'Tytuł musi mieć co najmniej 3 znaki'),
  tresc: z.string().min(10, 'Treść musi mieć co najmniej 10 znaków'),
});

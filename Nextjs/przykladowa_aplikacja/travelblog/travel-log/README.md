# TravelLog — gotowa aplikacja do warsztatu Next.js

To jest **kompletne rozwiązanie** warsztatu opisanego w pliku `warsztat-nextjs.md`.
Możesz uruchomić aplikację, żeby zobaczyć działający efekt każdego zadania,
albo po prostu przeglądać pliki, jeśli zgubiłeś się w trakcie ćwiczenia.

## Uruchomienie

```bash
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:3000`.

## Mapowanie zadań na pliki

| Zadanie | Plik / folder |
|---|---|
| 0 — inicjalizacja projektu | cała struktura `app/`, `package.json` |
| 1 — cztery podstrony | `app/page.tsx`, `app/blog/page.tsx`, `app/o-mnie/page.tsx`, `app/kontakt/page.tsx` |
| 2 — trasa zagnieżdżona | `app/o-mnie/cv/page.tsx` |
| 3 — segment dynamiczny `[id]` | `app/blog/[id]/page.tsx` |
| 4 — nawigacja (`Link` + `usePathname`) | `app/components/Nav.tsx` |
| 5 — layout wspólny + zagnieżdżony | `app/layout.tsx` (wspólny), `app/blog/layout.tsx` (tylko dla `/blog/*`) |
| 6 — pliki specjalne | `app/blog/[id]/loading.tsx`, `error.tsx`, `not-found.tsx` |
| 7 — komponent serwerowy/kliencki | `app/components/LikeButton.tsx` użyty w `app/blog/[id]/page.tsx` |
| 8 — tryby renderowania (SSG/SSR/ISR) | komentarz w `app/blog/page.tsx` + realny przykład SSR w `app/destynacje/page.tsx` (`cache: 'no-store'`) |
| 9 — Route Handler (GET/POST) | `app/api/destynacje/route.ts` |
| 10 — wykorzystanie API w stronie | `app/destynacje/page.tsx` + `app/components/DodajDestynacje.tsx` |

## Uwagi

- Dane wpisów na blogu (`app/blog/data.ts`) i destynacji (`app/api/destynacje/route.ts`)
  są przechowywane w pamięci procesu — to wystarcza do nauki, ale po restarcie
  serwera deweloperskiego nowo dodane destynacje znikną. W realnym projekcie
  (np. DevTrack) zastąpiłbyś to bazą danych, np. Prisma + PostgreSQL.
- Strona `/blog/[id]` ma sztuczne opóźnienie 600 ms (`setTimeout`), żeby dało
  się zobaczyć ekran `loading.tsx` w akcji — w realnej aplikacji to opóźnienie
  pochodziłoby naturalnie z czasu odpowiedzi bazy danych/API.
- Żeby zobaczyć `not-found.tsx`, wejdź na nieistniejący wpis, np. `/blog/999`.
- Żeby zobaczyć `error.tsx`, możesz tymczasowo dodać w `app/blog/[id]/page.tsx`
  linię `throw new Error('Testowy błąd');` i sprawdzić, jak reaguje aplikacja
  (potem usuń tę linię).

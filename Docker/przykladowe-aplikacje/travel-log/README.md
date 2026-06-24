# TravelLog — gotowa aplikacja do warsztatu Next.js (+ integracja z Express)

To jest **kompletne rozwiązanie** dwóch warsztatów:
1. `warsztat-nextjs.md` — podstawy Next.js (App Router).
2. `warsztat-nextjs-express-jwt.md` — integracja z API Express („Shop & Blog"): logowanie, token JWT, podpinanie go pod żądania.

## Uruchomienie przez Docker (zalecane — patrz `warsztat-docker.md`)

Ten projekt jest częścią większego środowiska `docker-compose.yml` (folder wyżej),
obejmującego też PostgreSQL i Express. Tam wystarczy jedna komenda z poziomu
folderu nadrzędnego:

```bash
docker compose up --build
```

`NEXT_PUBLIC_API_URL` jest wtedy przekazywany jako **build arg** w `Dockerfile`
(nie tylko jako runtime `environment` w compose) — zmienne `NEXT_PUBLIC_*` w
Next.js są "wpiekane" do kodu klienckiego już w czasie budowania, więc muszą być
znane przed `npm run build`. Szczegóły w `warsztat-docker.md` (Zadanie 8).

## Uruchomienie lokalne (bez Dockera, wymaga też działającej aplikacji Express na porcie 4000)

```bash
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:3000`. Adres API Express jest skonfigurowany w `.env.local` (`NEXT_PUBLIC_API_URL`).

**Uwaga:** żeby strony `/produkty`, `/logowanie` i `/artykuly-z-api` działały, musi równolegle działać projekt `express-shop-blog` (`npm run dev`, port 4000) — to osobny pakiet, dostarczony razem z tym archiwum.

## Mapowanie zadań na pliki (warsztat 1 — podstawy Next.js)

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

## Mapowanie zadań na pliki (warsztat 2 — integracja z Express, JWT)

| Zadanie | Plik / folder |
|---|---|
| 0 — konfiguracja środowiska | `.env.local` (`NEXT_PUBLIC_API_URL`) |
| 1 — modyfikacja Express (token w body logowania) | patrz `express-shop-blog/src/controllers/auth.controller.js`, `src/middleware/auth.js` |
| 2 — klient API | `app/lib/api.ts` |
| 3 — kontekst autoryzacji | `app/context/AuthContext.tsx` |
| 4 — podłączenie `AuthProvider` | `app/layout.tsx` |
| 5 — strona logowania | `app/logowanie/page.tsx` |
| 6 — chroniona strona produktów | `app/produkty/page.tsx` |
| 7 — strona publiczna (artykuły z Express) | `app/artykuly-z-api/page.tsx` |
| 8 — nawigacja Zaloguj/Wyloguj | `app/components/Nav.tsx` |
| 9 — obsługa wygasłego tokena | `app/produkty/page.tsx` (sprawdzenie `res.status === 401`) |

## Jak przetestować logowanie

1. Wejdź na `/produkty` bez logowania — zobaczysz komunikat z linkiem do logowania.
2. Przejdź na `/logowanie`, zaloguj się danymi: login `admin`, hasło `tajnehaslo123`
   (z `.env` projektu `express-shop-blog`).
3. Po zalogowaniu zostaniesz przekierowany na `/produkty` — lista pobrana z Express
   z nagłówkiem `Authorization: Bearer <token>`.
4. Kliknij „Wyloguj" w nawigacji — token zostaje usunięty z `sessionStorage`,
   a kolejna wizyta na `/produkty` znów pokaże komunikat o konieczności zalogowania.
5. Strona `/artykuly-z-api` działa od razu, bez logowania — to publiczny endpoint Express.

## Pozostałe uwagi (z pierwszego warsztatu)

- Dane wpisów na blogu (`app/blog/data.ts`) i destynacji (`app/api/destynacje/route.ts`)
  są przechowywane w pamięci procesu — to wystarcza do nauki, ale po restarcie
  serwera deweloperskiego nowo dodane destynacje znikną.
- Strona `/blog/[id]` ma sztuczne opóźnienie 600 ms (`setTimeout`), żeby dało
  się zobaczyć ekran `loading.tsx` w akcji.
- Żeby zobaczyć `not-found.tsx`, wejdź na nieistniejący wpis, np. `/blog/999`.


# Express Shop & Blog — gotowa aplikacja do warsztatu

To jest **kompletne rozwiązanie** trzech warsztatów:
1. `warsztat-express.md` — podstawy Express (architektura, logger, JWT, Zod, CORS).
2. `warsztat-nextjs-express-jwt.md` — integracja z Next.js (token JWT po stronie klienta).
3. `warsztat-docker.md` — Docker, PostgreSQL i Prisma (ten plik dotyczy poniższych zmian).

## ⚠️ Ważna zmiana: dane teraz w PostgreSQL (przez Prisma), nie w pamięci

Produkty i artykuły **nie są już** przechowywane w tablicach w pamięci procesu —
korzystają z bazy danych PostgreSQL przez Prisma ORM. Sygnatury funkcji w
`src/services/` zostały zachowane (`getAllProdukty`, `addProdukt`, ...), więc
kontrolery i routery wymagały tylko dodania `await` — kontrakt API (adresy,
kształt odpowiedzi JSON) **pozostał identyczny**, więc frontend Next.js działa
bez żadnych zmian.

## Uruchomienie lokalne (bez Dockera, wymaga zainstalowanego PostgreSQL)

```bash
npm install
npx prisma generate
npx prisma migrate deploy   # albo: npx prisma migrate dev (przy pierwszym starcie)
npm run prisma:seed         # opcjonalnie — wgrywa przykładowe dane
npm run dev
```

Ustaw `DATABASE_URL` w `.env` na swoją instancję PostgreSQL (przykład w `.env.example`).

## Uruchomienie przez Docker (zalecane — patrz `warsztat-docker.md`)

Ten projekt jest częścią większego środowiska `docker-compose.yml` (folder wyżej),
obejmującego też PostgreSQL i Next.js. Tam wystarczy:

```bash
docker compose up --build
```

## Mapowanie zadań na pliki (warsztat 1 — podstawy Express)

| Zadanie | Plik / folder |
|---|---|
| 0 — inicjalizacja projektu | `package.json`, `.env` |
| 1 — najprostsza wersja (jeden plik) | historyczny krok pośredni — finalna wersja jest już po Zadaniu 3 |
| 2 — dodanie POST | jak wyżej |
| 3 — architektura warstwowa | `src/routes/`, `src/controllers/`, `src/services/`, `src/app.js`, `src/server.js` |
| 4 — logowanie zdarzeń do pliku | `src/middleware/logger.js` (plik z logami: `src/logs/app.log`, tworzony automatycznie) |
| 5 — centralna obsługa błędów | `src/middleware/errorHandler.js` |
| 6 — walidacja Zod | `src/validators/produkt.schema.js`, `src/validators/artykul.schema.js`, `src/middleware/validate.js` |
| 7 — logowanie (.env) + JWT w cookie | `src/controllers/auth.controller.js`, `src/routes/auth.routes.js` |
| 8 — middleware JWT (GET chroniony, POST publiczny) | `src/middleware/auth.js`, zastosowany w `src/routes/produkty.routes.js` |
| 9 — CORS | konfiguracja w `src/app.js` (`cors({ origin, credentials: true })`) |

## Mapowanie zadań na pliki (warsztat 3 — Docker + Prisma + PostgreSQL)

| Zadanie | Plik / folder |
|---|---|
| Dockerfile + .dockerignore | `Dockerfile`, `.dockerignore` |
| Schemat Prisma | `prisma/schema.prisma` |
| Migracja + seed | `prisma/migrations/`, `prisma/seed.js` |
| Serwisy na Prisma | `src/services/produkty.service.js`, `src/services/artykuly.service.js`, `src/lib/prisma.js` |
| Kontrolery (dodane `await`) | `src/controllers/produkty.controller.js`, `src/controllers/artykuly.controller.js` |

## Endpointy

| Metoda | Adres | Dostęp |
|---|---|---|
| GET | `/` | publiczny (lista endpointów) |
| POST | `/api/auth/login` | publiczny — `{ "login": "...", "haslo": "..." }`, zwraca token JWT w `Set-Cookie` **oraz** w treści odpowiedzi JSON |
| POST | `/api/auth/logout` | publiczny |
| GET | `/api/auth/me` | **wymaga zalogowania** (cookie albo nagłówek `Authorization: Bearer <token>`) |
| GET | `/api/produkty` | **wymaga zalogowania** (cookie albo nagłówek `Authorization: Bearer <token>`) — dane z PostgreSQL |
| POST | `/api/produkty` | publiczny (`allow anonymous`) — `{ "nazwa": "...", "cena": 99.99 }` — zapis do PostgreSQL |
| GET | `/api/artykuly` | publiczny — dane z PostgreSQL |
| POST | `/api/artykuly` | publiczny — `{ "tytul": "...", "tresc": "..." }` — zapis do PostgreSQL |

> **Aktualizacja:** middleware `requireAuth` (`src/middleware/auth.js`) przyjmuje token
> zarówno z cookie `token`, jak i z nagłówka `Authorization: Bearer <token>`. Endpoint
> logowania zwraca token JWT również w treści JSON odpowiedzi (nie tylko w cookie) —
> dzięki temu frontend (np. aplikacja Next.js z osobnego warsztatu integracyjnego)
> może go zapamiętać po swojej stronie i ręcznie dołączać do żądań aż do wylogowania.
> Patrz `warsztat-nextjs-express-jwt.md`.

## Przykładowy scenariusz testowy (curl)

```bash
# 1. Próba odczytu produktów bez logowania -> 401
curl -i http://localhost:4000/api/produkty

# 2. Dodanie produktu anonimowo -> 201 (trafia do PostgreSQL)
curl -X POST http://localhost:4000/api/produkty \
  -H "Content-Type: application/json" \
  -d '{"nazwa":"Namiot 2-osobowy","cena":399.99}'

# 3. Logowanie i zapis cookie do pliku
curl -i -c cookies.txt -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","haslo":"tajnehaslo123"}'

# 4. Odczyt produktów z cookie -> 200
curl -b cookies.txt http://localhost:4000/api/produkty
```

## Logi

Każde żądanie HTTP oraz zdarzenia (logowania, błędy) są zapisywane do
`src/logs/app.log` — plik tworzy się automatycznie przy pierwszym żądaniu.

## Współpraca z frontendem (np. aplikacją Next.js z poprzedniego warsztatu)

CORS jest skonfigurowany dla `http://localhost:3000` (zmienna `CORS_ORIGIN` w `.env`).
Po stronie klienta pamiętaj o `credentials: 'include'` w `fetch`, żeby przeglądarka
wysyłała cookie z JWT:

```js
await fetch('http://localhost:4000/api/produkty', {
  credentials: 'include',
});
```


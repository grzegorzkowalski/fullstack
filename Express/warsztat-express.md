# Warsztat: Express.js — REST API „Sklep & Blog"

Budujemy API REST obsługujące dwie kolekcje: **produkty** i **artykuły**. Architektura dojrzewa krok po kroku: zaczynamy od jednego pliku, żeby zobaczyć koncept, a potem refaktoryzujemy do warstw `routes / controllers / services`, dodajemy centralne logowanie, walidację (Zod), logowanie JWT w cookie i CORS.

Każde zadanie ma: **opis i instrukcję** oraz **ukryte rozwiązanie** (kliknij, aby rozwinąć).

Docelowa struktura projektu (po Zadaniu 3+):

```
express-shop-blog/
  .env
  package.json
  src/
    server.js
    app.js
    data/
      produkty.data.js
      artykuly.data.js
    routes/
      produkty.routes.js
      artykuly.routes.js
      auth.routes.js
    controllers/
      produkty.controller.js
      artykuly.controller.js
      auth.controller.js
    services/
      produkty.service.js
      artykuly.service.js
    validators/
      produkt.schema.js
      artykul.schema.js
    middleware/
      logger.js
      errorHandler.js
      auth.js
    logs/
      app.log
```

---

## Zadanie 0 — Inicjalizacja projektu

### Opis i instrukcja

Stwórz nowy projekt Node.js z Express. Zainstaluj podstawowe zależności, które wykorzystamy w kolejnych zadaniach.

```bash
mkdir express-shop-blog
cd express-shop-blog
npm init -y
npm install express dotenv
npm install -D nodemon
```

Dodaj w `package.json` skrypt do uruchamiania w trybie deweloperskim oraz `"type": "module"`, żeby pisać w składni ES Modules (`import`/`export`).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`package.json`**
```json
{
  "name": "express-shop-blog",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.19.0",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

**`.env`**
```
PORT=4000
```

Test: po stworzeniu pierwszego pliku z Zadania 1 odpalisz `npm run dev`.

</details>

---

## Zadanie 1 — Najprostsza wersja API (jeden plik)

### Opis i instrukcja

Stwórz plik `src/server.js`, w którym w jednym pliku zdefiniujesz serwer Express z endpointami:
- `GET /api/produkty` — zwraca listę produktów (tablica w pamięci),
- `GET /api/artykuly` — zwraca listę artykułów (tablica w pamięci).

To jest celowo „naiwna" wersja — w kolejnym zadaniu zobaczysz, dlaczego trzymanie wszystkiego w jednym pliku szybko staje się problemem.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/server.js`**
```js
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const produkty = [
  { id: 1, nazwa: 'Kubek termiczny', cena: 49.99 },
  { id: 2, nazwa: 'Plecak trekkingowy', cena: 249.0 },
  { id: 3, nazwa: 'Latarka czołowa', cena: 79.5 },
];

const artykuly = [
  { id: 1, tytul: 'Jak pakować plecak na wyjazd', tresc: 'Kilka zasad pakowania...' },
  { id: 2, tytul: 'Najlepszy sprzęt na zimę', tresc: 'Przegląd kurtek i butów...' },
];

app.get('/api/produkty', (req, res) => {
  res.json(produkty);
});

app.get('/api/artykuly', (req, res) => {
  res.json(artykuly);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
```

Test: `curl http://localhost:4000/api/produkty` powinno zwrócić listę produktów w formacie JSON.

</details>

---

## Zadanie 2 — Dodanie operacji POST (jeszcze w jednym pliku)

### Opis i instrukcja

Dodaj w tym samym pliku obsługę:
- `POST /api/produkty` — tworzy nowy produkt na podstawie body żądania,
- `POST /api/artykuly` — tworzy nowy artykuł.

Zwróć uwagę, jak plik zaczyna się rozrastać i mieszać ze sobą: routing, logikę biznesową (generowanie ID) i walidację. To jest moment, w którym pojawia się potrzeba podziału na warstwy — zrobimy to w następnym zadaniu.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/server.js`** (fragment — dodane endpointy POST)
```js
app.use(express.json()); // wymagane, by Express parsował JSON z body żądania

app.post('/api/produkty', (req, res) => {
  const { nazwa, cena } = req.body;

  if (!nazwa || typeof cena !== 'number') {
    return res.status(400).json({ error: 'Wymagane: nazwa (string), cena (number)' });
  }

  const nowyProdukt = {
    id: produkty.length + 1,
    nazwa,
    cena,
  };

  produkty.push(nowyProdukt);
  res.status(201).json(nowyProdukt);
});

app.post('/api/artykuly', (req, res) => {
  const { tytul, tresc } = req.body;

  if (!tytul || !tresc) {
    return res.status(400).json({ error: 'Wymagane: tytul, tresc' });
  }

  const nowyArtykul = {
    id: artykuly.length + 1,
    tytul,
    tresc,
  };

  artykuly.push(nowyArtykul);
  res.status(201).json(nowyArtykul);
});
```

**Uwaga:** `app.use(express.json())` musi być zarejestrowane **przed** definicjami route'ów, które z niego korzystają — w przeciwnym razie `req.body` będzie `undefined`.

Widać już problem: walidacja „na ręcznie" (`if (!nazwa || ...)`) jest powtarzana i nieelastyczna, a logika tworzenia obiektu (generowanie `id`) miesza się z obsługą HTTP. To naprawimy w Zadaniu 3 (architektura) i Zadaniu 6 (Zod).

</details>

---

## Zadanie 3 — Refaktoryzacja do architektury warstwowej

### Opis i instrukcja

Podziel kod na trzy warstwy:
- **`routes/`** — definiują tylko adresy URL i metody HTTP, wskazują na kontrolery.
- **`controllers/`** — odbierają żądanie (`req`), wywołują odpowiedni serwis, zwracają odpowiedź (`res`).
- **`services/`** — logika biznesowa i „dostęp do danych" (na razie tablica w pamięci, w realnym projekcie byłaby to baza danych).

Dane przenieś do osobnych plików w `data/`. Stwórz `src/app.js` (konfiguracja aplikacji Express) oddzielony od `src/server.js` (uruchomienie serwera na porcie) — to ułatwia później pisanie testów.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/data/produkty.data.js`**
```js
export const produkty = [
  { id: 1, nazwa: 'Kubek termiczny', cena: 49.99 },
  { id: 2, nazwa: 'Plecak trekkingowy', cena: 249.0 },
  { id: 3, nazwa: 'Latarka czołowa', cena: 79.5 },
];
```

**`src/data/artykuly.data.js`**
```js
export const artykuly = [
  { id: 1, tytul: 'Jak pakować plecak na wyjazd', tresc: 'Kilka zasad pakowania...' },
  { id: 2, tytul: 'Najlepszy sprzęt na zimę', tresc: 'Przegląd kurtek i butów...' },
];
```

**`src/services/produkty.service.js`**
```js
import { produkty } from '../data/produkty.data.js';

export function getAllProdukty() {
  return produkty;
}

export function addProdukt({ nazwa, cena }) {
  const nowyProdukt = {
    id: produkty.length + 1,
    nazwa,
    cena,
  };
  produkty.push(nowyProdukt);
  return nowyProdukt;
}
```

**`src/services/artykuly.service.js`**
```js
import { artykuly } from '../data/artykuly.data.js';

export function getAllArtykuly() {
  return artykuly;
}

export function addArtykul({ tytul, tresc }) {
  const nowyArtykul = {
    id: artykuly.length + 1,
    tytul,
    tresc,
  };
  artykuly.push(nowyArtykul);
  return nowyArtykul;
}
```

**`src/controllers/produkty.controller.js`**
```js
import { getAllProdukty, addProdukt } from '../services/produkty.service.js';

export function listProdukty(req, res) {
  res.json(getAllProdukty());
}

export function createProdukt(req, res) {
  const { nazwa, cena } = req.body;

  if (!nazwa || typeof cena !== 'number') {
    return res.status(400).json({ error: 'Wymagane: nazwa (string), cena (number)' });
  }

  const nowyProdukt = addProdukt({ nazwa, cena });
  res.status(201).json(nowyProdukt);
}
```

**`src/controllers/artykuly.controller.js`**
```js
import { getAllArtykuly, addArtykul } from '../services/artykuly.service.js';

export function listArtykuly(req, res) {
  res.json(getAllArtykuly());
}

export function createArtykul(req, res) {
  const { tytul, tresc } = req.body;

  if (!tytul || !tresc) {
    return res.status(400).json({ error: 'Wymagane: tytul, tresc' });
  }

  const nowyArtykul = addArtykul({ tytul, tresc });
  res.status(201).json(nowyArtykul);
}
```

**`src/routes/produkty.routes.js`**
```js
import { Router } from 'express';
import { listProdukty, createProdukt } from '../controllers/produkty.controller.js';

const router = Router();

router.get('/', listProdukty);
router.post('/', createProdukt);

export default router;
```

**`src/routes/artykuly.routes.js`**
```js
import { Router } from 'express';
import { listArtykuly, createArtykul } from '../controllers/artykuly.controller.js';

const router = Router();

router.get('/', listArtykuly);
router.post('/', createArtykul);

export default router;
```

**`src/app.js`**
```js
import express from 'express';
import produktyRouter from './routes/produkty.routes.js';
import artykulyRouter from './routes/artykuly.routes.js';

const app = express();

app.use(express.json());

app.use('/api/produkty', produktyRouter);
app.use('/api/artykuly', artykulyRouter);

export default app;
```

**`src/server.js`**
```js
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
```

Każda warstwa ma teraz jedną odpowiedzialność: router wie tylko „jaki adres → jaki kontroler", kontroler obsługuje HTTP (req/res), a serwis nie wie nic o Expressie — operuje na zwykłych obiektach JS. Dzięki temu serwis można przetestować bez uruchamiania serwera HTTP.

</details>

---

## Zadanie 4 — Middleware centralnego logowania zdarzeń do pliku

### Opis i instrukcja

Stwórz middleware `src/middleware/logger.js`, które:
1. Loguje **każde** żądanie HTTP (metoda, URL, status odpowiedzi, czas trwania) do pliku `src/logs/app.log`.
2. Eksportuje też pomocniczą funkcję `logEvent(message)`, którą będziesz mógł wywoływać manualnie w innych miejscach kodu (np. przy logowaniu użytkownika w Zadaniu 7).

Podłącz middleware logujące żądania jako pierwsze w `app.js` (powinno działać dla każdego endpointu).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/middleware/logger.js`**
```js
import fs from 'fs';
import path from 'path';

const LOG_DIR = path.resolve('src/logs');
const LOG_FILE = path.join(LOG_DIR, 'app.log');

// Tworzymy folder logs/, jeśli jeszcze nie istnieje
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function appendToLog(line) {
  const timestamp = new Date().toISOString();
  fs.appendFile(LOG_FILE, `[${timestamp}] ${line}\n`, (err) => {
    if (err) console.error('Błąd zapisu logu:', err);
  });
}

// Middleware logujące każde żądanie HTTP
export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    appendToLog(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });

  next();
}

// Funkcja do manualnego logowania zdarzeń (np. logowanie użytkownika, błędy biznesowe)
export function logEvent(message) {
  appendToLog(`EVENT: ${message}`);
}
```

**`src/app.js`** (fragment — podłączenie middleware jako pierwszego)
```js
import express from 'express';
import { requestLogger } from './middleware/logger.js';
import produktyRouter from './routes/produkty.routes.js';
import artykulyRouter from './routes/artykuly.routes.js';

const app = express();

app.use(requestLogger); // logowanie musi być jak najwcześniej w łańcuchu middleware
app.use(express.json());

app.use('/api/produkty', produktyRouter);
app.use('/api/artykuly', artykulyRouter);

export default app;
```

Po kilku żądaniach plik `src/logs/app.log` powinien zawierać linie podobne do:
```
[2026-06-23T10:15:32.120Z] GET /api/produkty -> 200 (3ms)
[2026-06-23T10:15:40.045Z] POST /api/artykuly -> 201 (5ms)
```

</details>

---

## Zadanie 5 — Centralna obsługa błędów

### Opis i instrukcja

Stwórz middleware obsługi błędów `src/middleware/errorHandler.js` — funkcję z **czterema** argumentami (`err, req, res, next`), którą Express rozpoznaje jako specjalny error-handling middleware. Powinna:
1. Zalogować błąd do pliku (przez `logEvent` z Zadania 4).
2. Zwrócić klientowi czytelną odpowiedź JSON z kodem statusu (domyślnie `500`).

Zarejestruj ją **jako ostatnią** w `app.js`. Zmodyfikuj kontrolery, aby w przypadku nieprzewidzianych błędów wywoływały `next(err)` zamiast samodzielnie obsługiwać `try/catch` w każdym miejscu.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/middleware/errorHandler.js`**
```js
import { logEvent } from './logger.js';

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  logEvent(`ERROR ${status} on ${req.method} ${req.originalUrl}: ${err.message}`);

  res.status(status).json({
    error: err.message || 'Wewnętrzny błąd serwera',
  });
}
```

**`src/app.js`** (fragment — rejestracja na końcu, po routerach)
```js
import { errorHandler } from './middleware/errorHandler.js';

// ... app.use('/api/produkty', ...), app.use('/api/artykuly', ...)

app.use(errorHandler); // musi być zarejestrowany jako ostatni middleware
```

**Przykład użycia w kontrolerze** (`src/controllers/produkty.controller.js`)
```js
export function listProdukty(req, res, next) {
  try {
    res.json(getAllProdukty());
  } catch (err) {
    next(err); // przekazanie błędu do centralnego errorHandlera
  }
}
```

Dzięki temu nie musisz pisać własnej logiki odpowiedzi błędu w każdym kontrolerze — wystarczy `next(err)`, a `errorHandler` zajmie się logowaniem i formatem odpowiedzi w jednym miejscu.

</details>

---

## Zadanie 6 — Walidacja danych z użyciem Zod

### Opis i instrukcja

Zainstaluj `zod`:

```bash
npm install zod
```

Zdefiniuj schematy walidacji dla produktu i artykułu w `src/validators/`. Stwórz generyczny middleware `validate(schema)`, który sprawdzi `req.body` względem podanego schematu — w razie błędu zwróci `400` z listą problemów, w razie sukcesu przepuści żądanie dalej. Podłącz go do route'ów `POST`.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/validators/produkt.schema.js`**
```js
import { z } from 'zod';

export const produktSchema = z.object({
  nazwa: z.string().min(2, 'Nazwa musi mieć co najmniej 2 znaki'),
  cena: z.number().positive('Cena musi być liczbą większą od 0'),
});
```

**`src/validators/artykul.schema.js`**
```js
import { z } from 'zod';

export const artykulSchema = z.object({
  tytul: z.string().min(3, 'Tytuł musi mieć co najmniej 3 znaki'),
  tresc: z.string().min(10, 'Treść musi mieć co najmniej 10 znaków'),
});
```

**`src/middleware/validate.js`**
```js
export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: 'Błąd walidacji',
        details: result.error.issues.map((issue) => ({
          pole: issue.path.join('.'),
          komunikat: issue.message,
        })),
      });
    }

    req.body = result.data; // dane po walidacji (i ewentualnej transformacji Zod)
    next();
  };
}
```

**`src/routes/produkty.routes.js`** (zmodyfikowany)
```js
import { Router } from 'express';
import { listProdukty, createProdukt } from '../controllers/produkty.controller.js';
import { validate } from '../middleware/validate.js';
import { produktSchema } from '../validators/produkt.schema.js';

const router = Router();

router.get('/', listProdukty);
router.post('/', validate(produktSchema), createProdukt);

export default router;
```

**`src/routes/artykuly.routes.js`** (zmodyfikowany)
```js
import { Router } from 'express';
import { listArtykuly, createArtykul } from '../controllers/artykuly.controller.js';
import { validate } from '../middleware/validate.js';
import { artykulSchema } from '../validators/artykul.schema.js';

const router = Router();

router.get('/', listArtykuly);
router.post('/', validate(artykulSchema), createArtykul);

export default router;
```

Kontrolery `createProdukt`/`createArtykul` mogą teraz usunąć ręczne `if (!nazwa || ...)` — walidacja jest już zagwarantowana przez middleware, zanim żądanie dotrze do kontrolera.

```js
// src/controllers/produkty.controller.js — uproszczone po dodaniu Zod
export function createProdukt(req, res, next) {
  try {
    const nowyProdukt = addProdukt(req.body); // req.body jest już zwalidowane
    res.status(201).json(nowyProdukt);
  } catch (err) {
    next(err);
  }
}
```

</details>

---

## Zadanie 7 — Logowanie użytkownikiem i hasłem (.env) + JWT w cookie

### Opis i instrukcja

Zainstaluj potrzebne pakiety:

```bash
npm install jsonwebtoken cookie-parser
```

W `.env` dodaj dane logowania administratora oraz sekret JWT:

```
ADMIN_USER=admin
ADMIN_PASSWORD=tajnehaslo123
JWT_SECRET=bardzo-tajny-klucz-jwt
```

Stwórz endpoint `POST /api/auth/login`, który:
1. Przyjmuje `{ login, haslo }` w body.
2. Porównuje dane z wartościami z `.env`.
3. Po sukcesie generuje JWT (`jsonwebtoken`) i ustawia go w **httpOnly cookie**, a dodatkowo zwraca go również w treści odpowiedzi JSON.
4. Po niepowodzeniu zwraca `401`.

Zaloguj zdarzenie logowania (sukces/błąd) przez `logEvent` z Zadania 4.

> **Dlaczego token zarówno w cookie, jak i w body?** Cookie `httpOnly` jest bezpieczne (niedostępne z JS w przeglądarce), ale czasem frontend działa na innej domenie/porcie i woli zarządzać tokenem samodzielnie (np. trzymać go w pamięci i dołączać ręcznie w nagłówku `Authorization`). Zwracając token także w body, dajemy klientowi wybór — to przyda się w warsztacie integracyjnym z Next.js.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/controllers/auth.controller.js`**
```js
import jwt from 'jsonwebtoken';
import { logEvent } from '../middleware/logger.js';

export function login(req, res) {
  const { login, haslo } = req.body;

  const validLogin = login === process.env.ADMIN_USER;
  const validPassword = haslo === process.env.ADMIN_PASSWORD;

  if (!validLogin || !validPassword) {
    logEvent(`Nieudane logowanie dla loginu: ${login}`);
    return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
  }

  const token = jwt.sign({ login }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true, // niedostępne z JavaScriptu w przeglądarce — chroni przed XSS
    secure: false, // ustaw na true w produkcji (wymaga HTTPS)
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000, // 1 godzina
  });

  logEvent(`Zalogowano użytkownika: ${login}`);

  // Token zwracamy też w body — przyda się np. frontendowi, który zarządza
  // tokenem samodzielnie i dołącza go ręcznie w nagłówku Authorization.
  res.json({ message: 'Zalogowano pomyślnie', token });
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Wylogowano' });
}
```

**`src/routes/auth.routes.js`**
```js
import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
```

**`src/app.js`** (fragment — dodanie `cookie-parser` i routera auth)
```js
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

// ... app.use(requestLogger), app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', authRouter);
// ... app.use('/api/produkty', ...), app.use('/api/artykuly', ...)
```

**`src/server.js`** — upewnij się, że `dotenv.config()` jest wywołane przed użyciem `process.env.JWT_SECRET` (czyli na samym początku pliku startowego).

Test:
```bash
curl -i -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","haslo":"tajnehaslo123"}'
```
W odpowiedzi powinien znaleźć się nagłówek `Set-Cookie: token=...`.

</details>

---

## Zadanie 8 — Middleware JWT chroniący listę produktów (POST pozostaje publiczny)

### Opis i instrukcja

Stwórz middleware `src/middleware/auth.js`, które:
1. Odczyta token z nagłówka `Authorization: Bearer <token>` (jeśli jest), a w przeciwnym razie z cookie (`req.cookies.token`) — dwa równoległe sposoby przekazania tokena.
2. Zweryfikuje go (`jwt.verify`).
3. Jeśli token jest brak/nieprawidłowy — zwróci `401`.
4. Jeśli token jest poprawny — dołączy dane użytkownika do `req.user` i wywoła `next()`.

Zastosuj ten middleware **tylko** na `GET /api/produkty` (odczyt listy wymaga zalogowania). `POST /api/produkty` oraz wszystkie endpointy artykułów mają pozostać **dostępne anonimowo** (`allow anonymous`) — zgodnie z założeniem warsztatu.

> **Dlaczego dwa sposoby?** Cookie wygodnie działa, gdy frontend i backend są na tym samym „site" (np. ten sam port albo subdomena). Nagłówek `Authorization` działa zawsze, niezależnie od konfiguracji domen — to wzorzec, który wykorzystamy np. przy integracji z osobną aplikacją frontendową (Next.js).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/middleware/auth.js`**
```js
import jwt from 'jsonwebtoken';

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice('Bearer '.length);
  }
  return req.cookies?.token ?? null;
}

export function requireAuth(req, res, next) {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ error: 'Brak autoryzacji — zaloguj się' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token nieprawidłowy lub wygasł' });
  }
}
```

**`src/routes/produkty.routes.js`** (zmodyfikowany — `GET` chroniony, `POST` publiczny)
```js
import { Router } from 'express';
import { listProdukty, createProdukt } from '../controllers/produkty.controller.js';
import { validate } from '../middleware/validate.js';
import { produktSchema } from '../validators/produkt.schema.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, listProdukty); // wymaga zalogowania (cookie albo Bearer token)
router.post('/', validate(produktSchema), createProdukt); // allow anonymous

export default router;
```

`src/routes/artykuly.routes.js` pozostaje bez zmian — wszystkie jego endpointy są publiczne.

Test (wariant z cookie):
```bash
# Bez zalogowania — 401
curl -i http://localhost:4000/api/produkty

# Logowanie i zapis cookie do pliku, potem użycie go w kolejnym żądaniu
curl -i -c cookies.txt -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","haslo":"tajnehaslo123"}'

curl -i -b cookies.txt http://localhost:4000/api/produkty
```

Test (wariant z nagłówkiem `Authorization`, np. tak jak zrobi to frontend Next.js):
```bash
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","haslo":"tajnehaslo123"}' | node -e "console.log(JSON.parse(require('fs').readFileSync(0)).token)")

curl -i -H "Authorization: Bearer $TOKEN" http://localhost:4000/api/produkty
```

</details>

---

## Zadanie 9 — CORS dla żądań z innej domeny

### Opis i instrukcja

Zainstaluj pakiet `cors`:

```bash
npm install cors
```

Skonfiguruj go tak, by:
1. Zezwalał na żądania z konkretnej domeny frontendu (np. `http://localhost:3000` — adres Twojej aplikacji Next.js z poprzedniego warsztatu).
2. Zezwalał na przesyłanie cookies (`credentials: true`) — to konieczne, żeby cookie z JWT z Zadania 7/8 mogło być wysyłane w żądaniach cross-origin.

Pamiętaj: przy `credentials: true` nie można użyć `origin: '*'` — trzeba podać konkretną domenę.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`src/app.js`** (fragment — dodanie CORS jako jednego z pierwszych middleware)
```js
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000', // domena frontendu (np. aplikacja Next.js)
  credentials: true, // pozwala na przesyłanie i odbieranie cookies
};

app.use(cors(corsOptions));
```

Pełny, finalny `src/app.js` po wszystkich zadaniach:
```js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/auth.routes.js';
import produktyRouter from './routes/produkty.routes.js';
import artykulyRouter from './routes/artykuly.routes.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/produkty', produktyRouter);
app.use('/api/artykuly', artykulyRouter);

app.use(errorHandler); // zawsze na końcu

export default app;
```

**Po stronie klienta** (np. komponent kliencki w Next.js z poprzedniego warsztatu) trzeba pamiętać o `credentials: 'include'` w `fetch`, inaczej przeglądarka nie wyśle cookie:

```js
await fetch('http://localhost:4000/api/produkty', {
  credentials: 'include',
});
```

</details>

---

## Podsumowanie warsztatu

Po wykonaniu wszystkich zadań masz API, które demonstruje:
- start od jednego pliku, a potem **dojrzewanie architektury** do warstw routes/controllers/services,
- centralne logowanie żądań i zdarzeń do pliku tekstowego,
- centralną obsługę błędów (`next(err)` + jeden error-handling middleware),
- walidację danych wejściowych za pomocą **Zod**,
- logowanie użytkownika z danymi z `.env` i wydawanie **JWT w httpOnly cookie** (a także w treści odpowiedzi JSON, do ręcznego dołączania w nagłówku `Authorization: Bearer`),
- ochronę wybranego endpointu (`GET /api/produkty`) middleware'em JWT, przy zachowaniu publicznego dostępu do `POST` (`allow anonymous`),
- konfigurację **CORS** z `credentials: true`, umożliwiającą współpracę z frontendem na innej domenie (np. aplikacją Next.js z poprzedniego warsztatu).

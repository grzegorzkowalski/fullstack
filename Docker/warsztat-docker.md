# Warsztat: Docker, PostgreSQL i Prisma dla TravelLog + Express Shop & Blog

Dodajemy do obu aplikacji obsługę Dockera oraz przenosimy dane Express z pamięci procesu do **PostgreSQL** (przez **Prisma**). Cel dodatkowy: kontrakt API zostaje taki sam, a frontend nadal korzysta z Expressa pod `http://localhost:4000` z poziomu przeglądarki. Jedyna zmiana w Next.js dotyczy serwerowego pobierania danych: kontener `web` musi umieć wywołać kontener `api` po nazwie usługi Dockera.

Każde zadanie ma: **opis i instrukcję** oraz **ukryte rozwiązanie**.

Docelowa struktura (folder nadrzędny łączący obie aplikacje):

```
warsztat-docker/
  docker-compose.yml
  express-shop-blog/
    Dockerfile
    .dockerignore
    prisma/
      schema.prisma
      seed.js
      migrations/
        migration_lock.toml
        20260623000000_init/
          migration.sql
    src/
      lib/prisma.js
      ... (routes/controllers/services bez zmian w kontrakcie)
  travel-log/
    Dockerfile
    .dockerignore
    next.config.mjs   (dodane: output: 'standalone')
    public/
    app/ ... (jedna drobna zmiana w server-side fetch)
```

---

## Zadanie 0 — Plan: standardowa sieć Dockera i dwa adresy API

### Opis i instrukcja

Przed pisaniem plików Dockera, ustalmy zasadę. Next.js wywołuje Express pod adresem `http://localhost:4000` z przeglądarki, ale serwer Next.js działa już w kontenerze. Dla niego `localhost` oznacza kontener `web`, a nie kontener `api`.

Dlatego w warsztacie użyjemy standardowej sieci Dockera:

- przeglądarka na hoście będzie używać `http://localhost:3000` i `http://localhost:4000`,
- kontener `api` połączy się z bazą przez `db:5432`,
- serwerowe komponenty Next.js połączą się z Expressem przez `http://api:4000`,
- porty wystawimy przez `ports`, żeby działały na Docker Desktop na Windows/macOS oraz na Linuksie.

<details>
<summary>✅ Pokaż rozwiązanie (decyzja, nie kod)</summary>

Nie ma tu jeszcze kodu do napisania — to jest decyzja architektoniczna, którą zastosujemy w `docker-compose.yml`. Zapamiętaj:

- `NEXT_PUBLIC_API_URL=http://localhost:4000` jest dla kodu klienckiego uruchamianego w przeglądarce.
- `API_INTERNAL_URL=http://api:4000` jest dla kodu serwerowego Next.js uruchamianego wewnątrz kontenera.
- `DATABASE_URL=postgresql://shopblog:shopblog@db:5432/shopblog` jest dla Expressa uruchamianego wewnątrz kontenera.

</details>

---

## Zadanie 1 — Wprowadzenie Prisma do Express

### Opis i instrukcja

Zainstaluj Prisma i Prisma Client, zainicjuj konfigurację, zdefiniuj schemat z modelami `Produkt` i `Artykul` — **odzwierciedlającymi dokładnie te same pola**, które miały obiekty w tablicach w pamięci (`id`, `nazwa`, `cena` / `id`, `tytul`, `tresc`). To jest klucz do tego, żeby front nie zauważył różnicy: identyczny kształt JSON na wyjściu.

```bash
npm install prisma@6.16.3 --save-dev
npm install @prisma/client@6.16.3
```

Przypinamy wersję `6.16.3`, bo Prisma 7 zmieniła sposób konfiguracji datasource. Schemat z `url = env("DATABASE_URL")` działa poprawnie w Prisma 6 i pasuje do tego warsztatu.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`express-shop-blog/prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Produkt {
  id    Int    @id @default(autoincrement())
  nazwa String
  cena  Float

  @@map("produkty")
}

model Artykul {
  id    Int    @id @default(autoincrement())
  tytul String
  tresc String

  @@map("artykuly")
}
```

Kilka decyzji projektowych, które zachowują kompatybilność z frontendem:
- `id Int @default(autoincrement())` — taki sam typ (`number`) jak dotychczasowe ID generowane ręcznie w serwisach. Gdybyśmy użyli domyślnego `String @default(cuid())`, typy `Produkt`/`Artykul` w Next.js (`id: number`) przestałyby się zgadzać.
- `@@map("produkty")` / `@@map("artykuly")` — nazwy tabel w bazie po polsku, zgodnie z resztą projektu (Prisma domyślnie nazwałaby tabele `Produkt`/`Artykul`).

**`express-shop-blog/.env`** (dodana zmienna)
```
DATABASE_URL=postgresql://shopblog:shopblog@localhost:5432/shopblog
```

</details>

---

## Zadanie 2 — Migracja i dane startowe (seed)

### Opis i instrukcja

Wygeneruj migrację na podstawie schematu i napisz skrypt `seed.js`, który wgra te same przykładowe dane, które wcześniej były zahardkodowane w `src/data/*.data.js`.

```bash
npx prisma migrate dev --name init
```

<details>
<summary>✅ Pokaż rozwiązanie</summary>

Komenda `prisma migrate dev --name init` utworzy folder `prisma/migrations/<timestamp>_init/migration.sql` z zawartością analogiczną do:

```sql
-- CreateTable
CREATE TABLE "produkty" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "produkty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artykuly" (
    "id" SERIAL NOT NULL,
    "tytul" TEXT NOT NULL,
    "tresc" TEXT NOT NULL,

    CONSTRAINT "artykuly_pkey" PRIMARY KEY ("id")
);
```

**`express-shop-blog/prisma/seed.js`**
```js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const liczbaProduktow = await prisma.produkt.count();
  if (liczbaProduktow === 0) {
    await prisma.produkt.createMany({
      data: [
        { nazwa: 'Kubek termiczny', cena: 49.99 },
        { nazwa: 'Plecak trekkingowy', cena: 249.0 },
        { nazwa: 'Latarka czołowa', cena: 79.5 },
      ],
    });
    console.log('Zasiano przykładowe produkty.');
  }

  const liczbaArtykulow = await prisma.artykul.count();
  if (liczbaArtykulow === 0) {
    await prisma.artykul.createMany({
      data: [
        {
          tytul: 'Jak pakować plecak na wyjazd',
          tresc:
            'Kilka zasad pakowania, dzięki którym zmieścisz więcej i będziesz nosić mniej.',
        },
        {
          tytul: 'Najlepszy sprzęt na zimę',
          tresc: 'Przegląd kurtek, butów i akcesoriów na mroźne wyprawy.',
        },
      ],
    });
    console.log('Zasiano przykładowe artykuły.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
```

Sprawdzanie `count() === 0` przed wstawieniem zapobiega duplikowaniu danych przy wielokrotnym uruchomieniu seeda (np. po każdym restarcie kontenera).

**`package.json`** (fragment — rejestracja seeda i przydatne skrypty)
```json
{
  "scripts": {
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:migrate:deploy": "prisma migrate deploy",
    "prisma:seed": "node prisma/seed.js"
  },
  "prisma": {
    "seed": "node prisma/seed.js"
  }
}
```

</details>

---

## Zadanie 3 — Przepisanie serwisów na Prisma (bez zmiany kontraktu API)

### Opis i instrukcja

Zmodyfikuj `src/services/produkty.service.js` i `src/services/artykuly.service.js`, żeby korzystały z Prisma Client zamiast tablic w pamięci. **Zachowaj nazwy i sygnatury funkcji** (`getAllProdukty`, `addProdukt`, `getAllArtykuly`, `addArtykul`) — dzięki temu kontrolery (a w konsekwencji routery i kontrakt API) nie muszą się zmienić strukturalnie — jedyna zmiana to dodanie `await`, bo funkcje serwisowe stały się asynchroniczne (zapytania do bazy zawsze są asynchroniczne).

Usuń stare pliki `src/data/produkty.data.js` i `src/data/artykuly.data.js` — nie są już potrzebne.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`express-shop-blog/src/lib/prisma.js`** (nowy plik — jeden, współdzielony klient)
```js
import { PrismaClient } from '@prisma/client';

// Jeden, współdzielony klient Prisma dla całej aplikacji.
export const prisma = new PrismaClient();
```

**`express-shop-blog/src/services/produkty.service.js`**
```js
import { prisma } from '../lib/prisma.js';

export async function getAllProdukty() {
  return prisma.produkt.findMany({ orderBy: { id: 'asc' } });
}

export async function addProdukt({ nazwa, cena }) {
  return prisma.produkt.create({ data: { nazwa, cena } });
}
```

**`express-shop-blog/src/services/artykuly.service.js`**
```js
import { prisma } from '../lib/prisma.js';

export async function getAllArtykuly() {
  return prisma.artykul.findMany({ orderBy: { id: 'asc' } });
}

export async function addArtykul({ tytul, tresc }) {
  return prisma.artykul.create({ data: { tytul, tresc } });
}
```

**`express-shop-blog/src/controllers/produkty.controller.js`** (dodane `async`/`await`)
```js
import { getAllProdukty, addProdukt } from '../services/produkty.service.js';

export async function listProdukty(req, res, next) {
  try {
    const produkty = await getAllProdukty();
    res.json(produkty);
  } catch (err) {
    next(err);
  }
}

export async function createProdukt(req, res, next) {
  try {
    const nowyProdukt = await addProdukt(req.body);
    res.status(201).json(nowyProdukt);
  } catch (err) {
    next(err);
  }
}
```

**`express-shop-blog/src/controllers/artykuly.controller.js`** (analogicznie)
```js
import { getAllArtykuly, addArtykul } from '../services/artykuly.service.js';

export async function listArtykuly(req, res, next) {
  try {
    const artykuly = await getAllArtykuly();
    res.json(artykuly);
  } catch (err) {
    next(err);
  }
}

export async function createArtykul(req, res, next) {
  try {
    const nowyArtykul = await addArtykul(req.body);
    res.status(201).json(nowyArtykul);
  } catch (err) {
    next(err);
  }
}
```

Routery (`src/routes/produkty.routes.js`, `src/routes/artykuly.routes.js`), walidacja Zod, middleware JWT i logger — **bez żadnych zmian**. To jest dokładnie efekt dobrej architektury warstwowej z pierwszego warsztatu Express: zmiana sposobu przechowywania danych dotknęła tylko warstwy `services/` (i kosmetycznie `controllers/`), a nie `routes/` ani niczego ponad nimi.

</details>

---

## Zadanie 4 — Dockerfile dla Express

### Opis i instrukcja

Napisz `Dockerfile`, który: instaluje zależności, generuje Prisma Client (`prisma generate`), kopiuje kod aplikacji, a przy starcie kontenera najpierw stosuje migracje (`prisma migrate deploy`), a potem uruchamia serwer. Dodaj `.dockerignore`, żeby nie kopiować do obrazu `node_modules`, `.env` i logów.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`express-shop-blog/Dockerfile`**
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Najpierw tylko pliki potrzebne do instalacji zależności — lepsze cache'owanie warstw Dockera
COPY package*.json ./
COPY prisma ./prisma

RUN npm install

# Generowanie Prisma Client na podstawie schema.prisma (wymaga dostępu do internetu
# przy pierwszym build — pobiera silniki binarne Prisma)
RUN npx prisma generate

# Teraz reszta kodu aplikacji
COPY . .

EXPOSE 4000

# Przy starcie kontenera: zastosuj migracje na bazie (jeśli jeszcze nie zastosowane),
# a następnie uruchom serwer. "migrate deploy" jest bezpieczne do użycia w produkcji
# i przy każdym restarcie kontenera (nie tworzy nowych migracji, tylko stosuje istniejące).
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]
```

**`express-shop-blog/.dockerignore`**
```
node_modules
npm-debug.log
.env
.env.local
src/logs
.git
.gitignore
README.md
```

**Dlaczego `COPY package*.json ./` i `COPY prisma ./prisma` przed `npm install`, a resztę kodu później?**
Docker cache'uje warstwy obrazu. Jeśli nie zmienisz `package.json` ani schematu Prisma, kolejne buildy pominą `npm install` i `prisma generate` (najdłuższe kroki) i skorzystają z cache — przyspiesza to iterację podczas developmentu.

</details>

---

## Zadanie 5 — docker-compose: PostgreSQL + Express

### Opis i instrukcja

Stwórz `docker-compose.yml` w folderze nadrzędnym (obejmującym oba projekty jako podfoldery) z dwoma serwisami: `db` (obraz `postgres:16-alpine`, z wolumenem trwałym) i `api` (budowany z `./express-shop-blog`). Dodaj `healthcheck` dla bazy i `depends_on` z warunkiem `service_healthy`, żeby Express nie próbował się połączyć z bazą, zanim ta będzie gotowa.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`docker-compose.yml`** (wersja częściowa — `web` dodamy w Zadaniu 8)
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: shopblog
      POSTGRES_PASSWORD: shopblog
      POSTGRES_DB: shopblog
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U shopblog -d shopblog']
      interval: 5s
      timeout: 5s
      retries: 10

  api:
    build:
      context: ./express-shop-blog
    ports:
      - '4000:4000'
    environment:
      PORT: 4000
      DATABASE_URL: postgresql://shopblog:shopblog@db:5432/shopblog
      ADMIN_USER: admin
      ADMIN_PASSWORD: tajnehaslo123
      JWT_SECRET: bardzo-tajny-klucz-jwt
      CORS_ORIGIN: http://localhost:3000
    depends_on:
      db:
        condition: service_healthy

volumes:
  pgdata:
```

Zwróć uwagę: `DATABASE_URL` używa nazwy usługi `db`, a nie `localhost`. Dla kontenera `api` słowo `localhost` oznaczałoby jego własny kontener, więc Express nie znalazłby tam Postgresa.

Test (na tym etapie, przed dodaniem `web`):
```bash
docker compose up --build
curl http://localhost:4000/api/artykuly
```

</details>

---

## Zadanie 6 — Dockerfile dla Next.js (multi-stage, `output: 'standalone'`)

### Opis i instrukcja

Dodaj w `next.config.mjs` opcję `output: 'standalone'` — Next.js wygeneruje wtedy w `.next/standalone` minimalny, samodzielny zestaw plików do produkcyjnego uruchomienia (bez potrzeby kopiowania całego `node_modules` do obrazu). Stwórz folder `public/` (jeśli go nie masz — jest wymagany przez Dockerfile w kolejnym kroku, nawet jeśli pusty). Następnie napisz wieloetapowy `Dockerfile`: etap instalacji zależności, etap budowania i lekki etap produkcyjny.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/next.config.mjs`**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // "standalone" tworzy w .next/standalone samodzielny, minimalny zestaw plików
  // do uruchomienia produkcyjnego (przydatne w obrazie Docker — nie trzeba
  // kopiować całego node_modules).
  output: 'standalone',
};

export default nextConfig;
```

**`travel-log/Dockerfile`**
```dockerfile
# --- Etap 1: instalacja zależności ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# --- Etap 2: budowanie aplikacji ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* zmienne są "wpiekane" do kodu klienckiego w czasie budowania,
# więc muszą być dostępne jako ARG/ENV już na tym etapie — przekazanie ich
# tylko w "environment" docker-compose w runtime NIE zadziała dla komponentów klienckich.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# --- Etap 3: obraz produkcyjny (tylko niezbędne pliki z .next/standalone) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

**`travel-log/.dockerignore`**
```
node_modules
.next
.env.local
.git
.gitignore
README.md
npm-debug.log
```

Trzy etapy mają różne cele: `deps` instaluje pakiety (cache'owalne, jeśli `package.json` się nie zmienia), `builder` buduje aplikację (ma dostęp do całego kodu i `node_modules`, ale to duży, „brudny" obraz pośredni), a `runner` to finalny, lekki obraz — zawiera tylko to, co faktycznie potrzebne do `node server.js` w produkcji.

</details>

---

## Zadanie 7 — Publiczny i wewnętrzny adres API w Next.js

### Opis i instrukcja

W `app/context/AuthContext.tsx` i `app/lib/api.ts` (komponenty **klienckie**) używamy `process.env.NEXT_PUBLIC_API_URL`. Ta wartość trafia do kodu przeglądarki podczas `next build`, więc musi wskazywać na adres widoczny z hosta: `http://localhost:4000`.

Komponent serwerowy `/artykuly-z-api` działa jednak wewnątrz kontenera `web`. Tam `localhost:4000` oznaczałby kontener `web`, nie `api`. Dodaj dla niego osobną zmienną `API_INTERNAL_URL`, a jako fallback zostaw dotychczasowy publiczny adres.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

Next.js **nie** wysyła zmiennych środowiskowych do przeglądarki w czasie działania serwera (to byłoby zresztą ryzykowne dla zwykłych, niejawnych zmiennych). Zamiast tego, podczas `next build`, kompilator **zamienia** każde wystąpienie `process.env.NEXT_PUBLIC_API_URL` w kodzie komponentów klienckich na literalną wartość tekstową — tak jakby zrobić ręczne „znajdź i zamień" w kodzie przed wysłaniem go do przeglądarki.

Konsekwencja: jeśli ustawisz `NEXT_PUBLIC_API_URL` tylko jako `environment` w `docker-compose.yml` (czyli zmienną dostępną w **czasie działania** kontenera), będzie już **za późno** — obraz został zbudowany (i wartość „wpieczona") wcześniej, podczas `docker build`. Dlatego w Zadaniu 6 przekazaliśmy ją jako `ARG` w Dockerfile — a w Zadaniu 8 zobaczysz, jak dostarczyć tę wartość z `docker-compose.yml` jako `build.args`, czyli na etapie budowania obrazu, nie jego uruchamiania.

Komponenty **serwerowe** (np. `app/artykuly-z-api/page.tsx`) czytają `process.env.*` w czasie działania. Dlatego mogą dostać osobny adres wewnętrzny, dostępny tylko w sieci Dockera.

**`travel-log/app/artykuly-z-api/page.tsx`** (fragment)
```ts
async function getArtykuly(): Promise<Artykul[]> {
  const API_URL =
    process.env.API_INTERNAL_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    'http://localhost:4000';

  const res = await fetch(`${API_URL}/api/artykuly`, { cache: 'no-store' });
  return res.json();
}
```

</details>

---

## Zadanie 8 — Dodanie Next.js do `docker-compose.yml`

### Opis i instrukcja

Dodaj serwis `web` do `docker-compose.yml`, budowany z `./travel-log`, z `NEXT_PUBLIC_API_URL` przekazanym jako **build arg** (nie tylko `environment`).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`docker-compose.yml`** (fragment — dodany serwis `web`)
```yaml
  web:
    build:
      context: ./travel-log
      args:
        NEXT_PUBLIC_API_URL: http://localhost:4000
    ports:
      - '3000:3000'
    environment:
      PORT: 3000
      API_INTERNAL_URL: http://api:4000
    depends_on:
      - api
```

`args` w sekcji `build` przekazuje wartość do `ARG NEXT_PUBLIC_API_URL` w `Dockerfile` **w czasie budowania obrazu** — zgodnie z wyjaśnieniem z Zadania 7. `API_INTERNAL_URL` jest zwykłą zmienną runtime, bo korzysta z niej kod serwerowy Next.js działający już w kontenerze.

</details>

---

## Zadanie 9 — Pełny `docker-compose.yml`

### Opis i instrukcja

Złóż wszystko w jeden plik: `db`, `api`, `web`, standardowa sieć Dockera, porty wystawione na hosta i nazwany wolumen na dane PostgreSQL, żeby przetrwały restart kontenera.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`docker-compose.yml`** (pełna wersja)
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: shopblog
      POSTGRES_PASSWORD: shopblog
      POSTGRES_DB: shopblog
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U shopblog -d shopblog']
      interval: 5s
      timeout: 5s
      retries: 10

  api:
    build:
      context: ./express-shop-blog
    ports:
      - '4000:4000'
    environment:
      PORT: 4000
      DATABASE_URL: postgresql://shopblog:shopblog@db:5432/shopblog
      ADMIN_USER: admin
      ADMIN_PASSWORD: tajnehaslo123
      JWT_SECRET: bardzo-tajny-klucz-jwt
      CORS_ORIGIN: http://localhost:3000
    depends_on:
      db:
        condition: service_healthy

  web:
    build:
      context: ./travel-log
      args:
        NEXT_PUBLIC_API_URL: http://localhost:4000
    ports:
      - '3000:3000'
    environment:
      PORT: 3000
      API_INTERNAL_URL: http://api:4000
    depends_on:
      - api

volumes:
  pgdata:
```

Uruchomienie całości:
```bash
docker version
docker compose up --build
```

Jeśli `docker version` pokazuje tylko część `Client` albo zwraca błąd z `//./pipe/dockerDesktopLinuxEngine`, uruchom Docker Desktop i poczekaj, aż daemon będzie gotowy. Dopiero wtedy `docker compose up --build` będzie w stanie budować obrazy i startować kontenery.

Jednorazowe zasianie danych:
```bash
docker compose exec api npm run prisma:seed
```

</details>

---

## Zadanie 10 — Test całości

### Opis i instrukcja

Zweryfikuj, że wszystko działa razem, dokładnie tak jak przed Dockerem:
1. `http://localhost:3000/artykuly-z-api` — dane z Express (publiczne), bez logowania.
2. `http://localhost:3000/produkty` bez logowania — komunikat z linkiem do `/logowanie`.
3. Zaloguj się (`admin` / `tajnehaslo123`) i sprawdź `/produkty` — dane z PostgreSQL przez Prisma.
4. Sprawdź, że dane przetrwają restart kontenerów (`docker compose restart`), ale **nie** przetrwają `docker compose down -v` (usunięcie wolumenu).

<details>
<summary>✅ Pokaż rozwiązanie (scenariusz testowy)</summary>

```bash
# Te komendy zakładają Bash albo Git Bash.
# W PowerShell możesz wejść na adresy w przeglądarce albo użyć curl.exe.

# Start całego środowiska
docker compose up --build -d

# Zasianie danych (jednorazowo)
docker compose exec api npm run prisma:seed

# Test publicznego endpointu Express przez frontend Next.js
curl -s http://localhost:3000/artykuly-z-api | grep "Jak pakować plecak"

# Test logowania
TOKEN=$(curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","haslo":"tajnehaslo123"}' \
  | node -e "console.log(JSON.parse(require('fs').readFileSync(0)).token)")

# Test chronionego endpointu z tokenem
curl -s -H "Authorization: Bearer $TOKEN" http://localhost:4000/api/produkty

# Restart — dane powinny przetrwać (wolumen pgdata)
docker compose restart
curl -s http://localhost:4000/api/artykuly

# Pełne wyczyszczenie (usuwa też wolumen z danymi)
docker compose down -v
```

</details>

---

## Podsumowanie warsztatu

Po wykonaniu wszystkich zadań masz środowisko, które demonstruje:
- konteneryzację dwóch niezależnych aplikacji (Next.js + Express) oraz bazy danych PostgreSQL,
- migrację z przechowywania danych w pamięci do trwałej bazy danych przez **Prisma ORM**, bez zmiany kontraktu API,
- wieloetapowy (`multi-stage`) `Dockerfile` dla Next.js z `output: 'standalone'`,
- różnicę między publicznym adresem API dla przeglądarki (`NEXT_PUBLIC_API_URL`) a wewnętrznym adresem API dla serwera Next.js w kontenerze (`API_INTERNAL_URL`),
- różnicę między zmiennymi środowiskowymi dostępnymi w czasie **budowania** obrazu (`NEXT_PUBLIC_*`, `ARG`/`build.args`) a w czasie jego **działania** (`environment`),
- `healthcheck` i `depends_on: condition: service_healthy`, żeby usługi startowały w poprawnej kolejności,
- standardową sieć Dockera z nazwami usług (`db`, `api`) i mapowaniem portów, która działa także na Docker Desktop na Windows/macOS.

# TravelLog + Express Shop & Blog — środowisko Docker

Ten folder łączy dwie wcześniej zbudowane aplikacje w jedno środowisko uruchamiane
jedną komendą `docker compose up`:

- **`travel-log/`** — frontend Next.js (App Router), bez żadnych zmian w logice biznesowej.
- **`express-shop-blog/`** — backend Express, teraz z **Prisma + PostgreSQL** zamiast danych w pamięci.
- **PostgreSQL 16** — w kontenerze, z danymi trwałymi w wolumenie Dockera.

## Uruchomienie

```bash
docker compose up --build
```

Pierwsze uruchomienie zbuduje obrazy (w tym `npx prisma generate` i pobranie silników
Prisma — wymaga dostępu do internetu), uruchomi Postgresa, zaczeka aż będzie gotowy
(`healthcheck`), zastosuje migracje Prisma (`prisma migrate deploy`) i odpali oba serwisy.

Po starcie:
- Next.js: `http://localhost:3000`
- Express API: `http://localhost:4000`
- PostgreSQL: `localhost:5432` (user/baza: `shopblog` / `shopblog`)

Żeby zasiać przykładowe dane (produkty/artykuły), jednorazowo:

```bash
docker compose exec api npm run prisma:seed
```

## Dlaczego `network_mode: host`?

W warsztacie w `warsztat-docker.md` pokazany jest wariant z `network_mode: host`,
bo na Linuksie pozwala on potraktować `localhost` identycznie w kontenerach i na
hoście.

Ten gotowy przykład jest ustawiony pod Docker Desktop na Windows/macOS i używa
standardowej sieci Dockera:

- przeglądarka na hoście używa `http://localhost:3000` i `http://localhost:4000`,
- kontener API łączy się z bazą przez nazwę usługi `db`,
- serwerowe komponenty Next.js łączą się z API przez nazwę usługi `api`,
- porty `3000`, `4000` i `5432` są wystawione przez sekcję `ports`.

## Zatrzymanie i czyszczenie

```bash
docker compose down          # zatrzymuje kontenery, zachowuje dane w wolumenie
docker compose down -v       # zatrzymuje i usuwa też wolumen z danymi Postgresa
```

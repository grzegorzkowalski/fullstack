# Plan projektu przyrostowego — „DevTrack"
### Mini-system zarządzania zadaniami projektowymi (jak uproszczone Jira/Trello)

Projekt realizowany przez całe szkolenie PB 5.0 — każdy moduł dodaje jedną, konkretną warstwę funkcjonalną/technologiczną do tej samej aplikacji.

---

## 1. Dlaczego ten projekt

- **Znajomy domenowo** — studenci Informatyki intuicyjnie rozumieją domenę (projekty, zadania, statusy, komentarze) bez dodatkowego wprowadzenia merytorycznego — cały czas warsztatu idzie na technologię, nie na zrozumienie biznesu.
- **Naturalnie skaluje się** z każdym modułem — od prostej listy w czystym React, przez SPA, po pełny Full-Stack z bazą, testami, kontenerami, CI/CD i AI.
- **Daje sensowny pretekst** do każdego wymaganego zagadnienia: relacje w bazie (projekt→zadania→komentarze), JWT (logowanie do systemu), AI (podsumowanie zadania, prosty asystent po danych projektu), dane analityczne (log aktywności → mini-hurtownia).
- Wystarczająco prosty, by zmieścić się w 28h, wystarczająco bogaty, by nie spłycić żadnej technologii.

## 2. Zakres MVP (cel końcowy na koniec szkolenia)

Aplikacja webowa, w której zalogowany użytkownik:
- widzi listę swoich **projektów**, może utworzyć nowy projekt,
- w ramach projektu zarządza **zadaniami** (tytuł, opis, status: `TODO / IN_PROGRESS / DONE`, priorytet, przypisana osoba),
- dodaje **komentarze** do zadań,
- może kliknąć „**Podsumuj AI**" przy długim opisie zadania, by dostać krótkie streszczenie,
- może zadać pytanie prostemu **asystentowi AI** o stan projektu (np. „ile zadań jest w toku?"),
- widzi prosty **panel statystyk** projektu (liczba zadań per status, aktywność w czasie) zasilany logiem zdarzeń.

## 3. Model danych (docelowy, budowany przyrostowo)

```
User        { id, email, passwordHash, name, role }
Project     { id, name, description, ownerId }
Task        { id, projectId, title, description, status, priority, assigneeId, createdAt }
Comment     { id, taskId, authorId, content, createdAt }
ActivityLog { id, taskId, action, payload, createdAt }   // do modułu o danych
```

Relacje: `User 1—N Project (owner)`, `Project 1—N Task`, `Task 1—N Comment`, `Task 1—N ActivityLog`.

---

## 4. Mapowanie: moduł szkolenia → konkretny przyrost w projekcie

| Moduł | Co robimy w DevTrack |
|---|---|
| **1. Wprowadzenie, Git** | Klonowanie repo startowego (szkielet React, dane mockowane), pierwszy branch + PR z drobną zmianą (np. nazwa appki w nagłówku) |
| **2. React — fundamenty** | Statyczny widok: lista zadań (z danych mockowych) + formularz dodawania zadania — czysty React, bez routingu i bez TS |
| **3. Stan i routing** | Trasy `/projects`, `/projects/:id`, `/login`; globalny stan „zalogowany użytkownik" (Context); przejście między listą projektów i widokiem zadań projektu |
| **4. TypeScript — podstawy** | Definicja typów `User`, `Project`, `Task`, `Comment`; konfiguracja `tsconfig` w projekcie |
| **5. TypeScript w React** | Otypowanie komponentów z modułu 2–3 (propsy, `useState<Task[]>`, eventy formularza) |
| **6. Integracja z API / async** | Podłączenie listy zadań do testowego REST API (np. lokalny `json-server` lub wczesna wersja własnego API) — `fetch`/`axios`, stany ładowania/błędu, custom hook `useTasks()` |
| **7. Next.js — Full-Stack** | Migracja SPA → Next.js (App Router); strona `/projects/[id]` jako Server Component; pierwszy Route Handler `GET /api/projects` zwracający dane mockowane z serwera |
| **8. Node.js + Express — REST API** | Pełne, samodzielne API Express dla zasobu **Task**: `GET/POST/PATCH/DELETE /tasks`, walidacja danych wejściowych (zod) |
| **9. JWT** | `POST /auth/register`, `POST /auth/login`; middleware autoryzacyjny chroniący endpointy `Task`/`Project`; ochrona tras frontendowych (przekierowanie niezalogowanych) |
| **10. PostgreSQL + Prisma** | Pełny schema Prisma (User, Project, Task, Comment), migracje, zastąpienie danych mockowych prawdziwymi zapytaniami CRUD; relacje (zadania projektu, komentarze zadania) |
| **11. Testy — Jest + RTL** | Testy jednostkowe logiki zmiany statusu zadania; testy RTL dla komponentu listy zadań i formularza (render, interakcja, walidacja); test endpointu `Task` (np. supertest) |
| **12. Docker** | Dockerfile dla frontendu i backendu, `docker-compose.yml` (app + PostgreSQL) — całość odpalana jedną komendą |
| **13. CI/CD** | GitHub Actions: workflow `lint → test → build`, automatyczne wdrożenie na środowisko testowe (Vercel dla frontu / Render dla API) po merge do `main` |
| **14. Hurtownie i jeziora danych** | Dodanie `ActivityLog` (zapis zdarzeń: utworzenie zadania, zmiana statusu); prosty endpoint agregujący (`GET /projects/:id/stats`); dyskusja: jak ten log mógłby trafiać do data lake (np. eksport do plików JSON/Parquet) i dalej do hurtowni/raportów BI — bez pełnej implementacji |
| **15. Integracja z AI API** | (a) endpoint `POST /tasks/:id/summarize` — wysyła opis zadania do API AI i zwraca streszczenie, wyświetlane w UI; (b) prosty endpoint „asystenta" `POST /projects/:id/ask` — pytanie w naturalnym języku + dane projektu w promptcie → odpowiedź AI |

---

## 5. Finałowy zestaw widoków (frontend)

1. `/login` — logowanie/rejestracja
2. `/projects` — lista projektów użytkownika + tworzenie nowego
3. `/projects/[id]` — lista zadań projektu, filtrowanie po statusie, panel statystyk
4. `/projects/[id]/tasks/[taskId]` — szczegóły zadania, komentarze, przycisk „Podsumuj AI"
5. Komponent „Asystent AI" (np. panel boczny/modal) dostępny na widoku projektu

## 6. Finałowy zestaw endpointów (backend)

```
POST   /auth/register
POST   /auth/login
GET    /projects
POST   /projects
GET    /projects/:id
GET    /projects/:id/stats
POST   /projects/:id/ask              (AI)
GET    /tasks?projectId=
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id
POST   /tasks/:id/summarize           (AI)
GET    /tasks/:id/comments
POST   /tasks/:id/comments
```

## 7. Model pracy — każdy robi swój projekt

Każdy z 13 uczestników buduje **własną, indywidualną kopię DevTrack** w swoim repozytorium, w tym samym tempie co cała grupa (live coding prowadzącego + samodzielne powtórzenie/zadanie). Bez podziału na zespoły i bez ról frontend/backend — każdy przechodzi całą ścieżkę technologiczną od początku do końca.

## 8. Checkpointy — gotowy kod na każdym etapie (siatka bezpieczeństwa)

Żeby nikt nie „wypadł" z kursu przez jedno zaległe zadanie, repozytorium startowe ma od razu przygotowaną **pełną, gotową wersję projektu na koniec każdego modułu**. To nie są podpowiedzi czy fragmenty — to kompletny, działający kod, identyczny z tym, co powinno wyjść z danego modułu.

**Mechanika:**
- Repozytorium ma branch/tag dla **każdego z 15 modułów**, np. `checkpoint-01` … `checkpoint-15`, każdy = stan projektu *po* zakończeniu danego modułu.
- Kto nie zdąży lub się „wykrzaczy" w module N, robi `git checkout checkpoint-0N` (albo pobiera gotowy ZIP) i startuje moduł N+1 z poprawnym punktem wyjścia — nie blokuje się na własnym błędzie i nie traci kolejnych godzin warsztatu.
- Każdy checkpoint ma krótki `README` z opisem „co powinno działać na tym etapie" + ewentualnie listę zmian względem poprzedniego checkpointu (changelog), żeby ktoś, kto przeskoczył, wiedział co dogonić we własnym czasie.
- Checkpointy są też materiałem referencyjnym po szkoleniu — uczestnik zawsze może porównać swój kod z wzorcowym.

**Przygotowanie (zadanie do wykonania przed szkoleniem, w ramach prac nad materiałami):**
Trzeba zbudować 15 kompletnych, narastających wersji aplikacji (każda buduje się na poprzedniej), przetestować, że każda się odpala „z pudełka" (`npm install && npm run dev`, docker-compose dla checkpointów z bazą), i spakować jako branche/tagi w jednym repo + ewentualnie jako osobne ZIP-y dla osób bez Gita.

## 9. Co celowo zostaje uproszczone (poza zakresem 28h)

- Brak pełnego systemu ról/uprawnień (poza rozróżnieniem zalogowany/niezalogowany)
- Brak realnego pipeline'u ETL do hurtowni — moduł 14 jest demonstracyjno-dyskusyjny
- AI „asystent" działa na krótkim, bezpośrednim promptcie z danymi projektu, bez pełnego RAG/wektorowej bazy wiedzy
- Brak płatnego/produkcyjnego wdrożenia — wystarczy darmowy tier (Vercel/Render)

---

*Dokument roboczy — do ustalenia: nazwa/branding aplikacji (czy zostawiamy „DevTrack" czy zmieniamy domenę np. na coś bliższego studentom), wybór dostawcy API AI, sposób dystrybucji checkpointów (jedno repo z tagami vs osobne repo na moduł).*

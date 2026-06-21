# Program szkolenia: Projektowanie i tworzenie aplikacji webowych Full-Stack
### Projekt „PB 5.0" — szkolenie dla studentów VI semestru Informatyki

**Forma:** zdalna, warsztatowa | **Liczba uczestników:** 13 | **Wymiar:** 28 godzin dydaktycznych (45 min) | **Termin realizacji:** do 30.06.2026 | **Podział:** 2 części

---

## 1. Założenia metodyczne

Szkolenie jest oparte na zasadzie **"jeden projekt, cała aplikacja"** — uczestnicy od pierwszego do ostatniego modułu rozwijają jedną, wspólną/indywidualną aplikację Full-Stack (np. *system zarządzania zadaniami z modułem AI* lub *prosty serwis rekrutacyjny* — propozycja do ustalenia), do której kolejne moduły dodają nowe warstwy technologiczne. Dzięki temu:

- każdy blok teoretyczny trwa maks. 15–20% czasu modułu, reszta to praca własna pod nadzorem prowadzącego (live coding + zadania),
- studenci od razu widzą, jak technologie łączą się w całość, a nie jako osobne, niepowiązane demo,
- na koniec każdej części powstaje działający, przyrostowy artefakt, który można pokazać/oddać jako efekt pracy,
- finał szkolenia = działająca aplikacja: frontend (React/TS/Next.js) + backend (Node/Express/Prisma) + baza danych (PostgreSQL) + testy + konteneryzacja + pipeline CI/CD + integracja z API AI.

**Repozytorium startowe** i szkielet projektu (boilerplate) przygotowywane są przez prowadzącego przed szkoleniem, aby nie tracić czasu warsztatowego na konfigurację od zera (poza modułem wprowadzającym, gdzie konfiguracja jest celem ćwiczenia).

---

## 2. Podział na części

| Część | Tematyka | Liczba godzin |
|---|---|---|
| **Część I** | Frontend: React, TypeScript, integracja z API | **12 h** |
| **Część II** | Full-stack: Next.js, Node/Express, PostgreSQL/Prisma, testy, Docker/CI-CD, dane, AI API | **16 h** |
| **Razem** | | **28 h** |

Każdą część można dalej podzielić na sesje 4–7-godzinne (do ustalenia z grupą), tak by zmieścić się w limicie dwóch części zamówienia.

---

## 3. Program szczegółowy

### CZĘŚĆ I — FRONTEND (12 h)

#### Moduł 1. Wprowadzenie, środowisko, Git/GitHub (1,5 h)
- Cele szkolenia, prezentacja projektu końcowego i kryteriów sukcesu
- Konfiguracja środowiska: Node.js, pnpm/npm, VS Code, rozszerzenia
- Git: repozytorium, branch, commit, pull request — workflow zespołowy (feature branch + PR + code review)
- **Ćwiczenie:** każdy uczestnik forkuje/klonuje repo startowe, tworzy własny branch, wykonuje pierwszy commit i PR

#### Moduł 2. React — fundamenty i architektura komponentowa (3 h)
- JSX, komponenty funkcyjne, props, kompozycja komponentów
- Hooki: `useState`, `useEffect`, `useRef`, zasady hooków
- Podział na komponenty prezentacyjne i kontenerowe, struktura katalogów
- **Ćwiczenie:** budowa widoku listy + formularza (np. lista zadań/ofert) w czystym React

#### Moduł 3. Zarządzanie stanem i routing SPA (2 h)
- Stan lokalny vs globalny, przekazywanie danych (props drilling), Context API
- Krótkie porównanie bibliotek stanu (Zustand/Redux Toolkit) — kiedy warto
- React Router: trasy, parametry, layouty, ochrona tras (private routes)
- **Ćwiczenie:** rozbudowa aplikacji o routing wielowidokowy i globalny stan (np. koszyk/sesja użytkownika)

#### Moduł 4. TypeScript — podstawy (2 h)
- Typy podstawowe, typy złożone, `interface` vs `type`, `union`/`intersection`
- Generyki — dlaczego i kiedy
- Konfiguracja `tsconfig.json`, `strict mode`
- **Ćwiczenie:** migracja wybranych plików JS → TS, typowanie modeli danych projektu

#### Moduł 5. TypeScript w React (1,5 h)
- Typowanie propsów, komponentów, hooków (`useState<T>`, custom hooki)
- Typowanie zdarzeń (eventy formularzy, inputy)
- **Ćwiczenie:** pełne otypowanie komponentów z modułu 2–3

#### Moduł 6. Integracja z API i operacje asynchronicze (2 h)
- `fetch` vs `axios`, `async/await`, obsługa błędów i stanów ładowania
- Custom hooki do komunikacji z API (`useFetch`, `useQuery`-like pattern)
- Wprowadzenie do React Query/TanStack Query (opcjonalnie, jeśli czas pozwoli)
- **Ćwiczenie:** podłączenie frontendu do mockowanego/testowego REST API

**Efekt Części I:** działająca aplikacja SPA w React + TypeScript, z routingiem, zarządzaniem stanem i komunikacją z zewnętrznym API.

---

### CZĘŚĆ II — FULL-STACK, DANE, DEVOPS, AI (16 h)

#### Moduł 7. Next.js — aplikacja Full-Stack (4 h)
- Routing plikowy (App Router), layouty, strony, komponenty serwerowe i klienckie
- Renderowanie: SSR, SSG, ISR — różnice i zastosowania
- API Routes / Route Handlers jako backend wewnątrz Next.js
- Migracja/przepisanie aplikacji z Części I do struktury Next.js
- **Ćwiczenie:** przeniesienie SPA do Next.js, dodanie pierwszego endpointu API Route

#### Moduł 8. Node.js + Express — REST API (2 h)
- Tworzenie serwera Express, routing, middleware
- Walidacja danych wejściowych (zod/Joi), obsługa błędów
- Struktura projektu backendowego (kontrolery, serwisy, routery)
- **Ćwiczenie:** budowa samodzielnego REST API (poza Next.js) dla wybranego zasobu (np. `/users`, `/tasks`)

#### Moduł 9. Uwierzytelnianie i autoryzacja JWT (1 h)
- Rejestracja/logowanie, hashowanie haseł (bcrypt)
- Tokeny JWT — generowanie, weryfikacja, middleware autoryzacyjny
- Ochrona endpointów i tras frontendowych
- **Ćwiczenie:** dodanie logowania do aplikacji projektowej

#### Moduł 10. PostgreSQL i Prisma ORM (3 h)
- Modelowanie relacyjne: tabele, relacje 1:N, N:N, normalizacja (skrótowo)
- Prisma: schema, migracje, Prisma Client, zapytania (CRUD, relacje, filtrowanie)
- Połączenie bazy z API z modułu 8/9
- **Ćwiczenie:** zaprojektowanie schematu bazy projektu, wygenerowanie migracji, podłączenie do API

#### Moduł 11. Testowanie — Jest i React Testing Library (2 h)
- Jest: testy jednostkowe funkcji/logiki biznesowej i endpointów API
- RTL: testy komponentów React (render, interakcje użytkownika, asercje)
- Testowanie komunikacji z API (mockowanie żądań)
- **Ćwiczenie:** napisanie zestawu testów dla wybranego komponentu i endpointu projektu

#### Moduł 12. Docker i konteneryzacja (1 h)
- Dockerfile dla frontendu i backendu, `docker-compose` (app + PostgreSQL)
- Zmienne środowiskowe, dobre praktyki (multi-stage build)
- **Ćwiczenie:** konteneryzacja całej aplikacji projektowej i odpalenie jednym `docker-compose up`

#### Moduł 13. CI/CD — podstawy (1 h)
- GitHub Actions: workflow, joby, etapy (build → test → deploy)
- Automatyczne odpalanie testów przy PR, wdrożenie na środowisko chmurowe (np. Vercel/Render/Fly.io)
- **Ćwiczenie:** skonfigurowanie pipeline'u CI dla repozytorium projektowego

#### Moduł 14. Hurtownie danych i jeziora danych (1 h)
- Różnice: baza transakcyjna (OLTP) vs hurtownia danych (OLAP) vs data lake
- Typowe miejsce tych rozwiązań w architekturze aplikacji webowej (ETL/ELT, analityka, raportowanie)
- Krótkie demo/case study na przykładzie danych z aplikacji projektowej
- Forma: wykład-warsztat z dyskusją i przykładami, bez pełnej implementacji (ze względu na zakres czasowy)

#### Moduł 15. Integracja z zewnętrznymi API AI (1 h)
- Wzorce integracji: wywołania API (np. Anthropic/OpenAI), obsługa streamingu, kluczy i kosztów
- Przykładowe zastosowania: chatbot, podsumowywanie treści, analiza/klasyfikacja danych tekstowych
- **Ćwiczenie:** dodanie do aplikacji projektowej prostej funkcji AI (np. endpoint podsumowujący treść zgłoszenia/zadania)

**Efekt Części II:** rozbudowana aplikacja Full-Stack (Next.js + Express/Prisma + PostgreSQL), przetestowana, skonteneryzowana, z działającym pipeline'em CI/CD i funkcją AI — gotowa do prezentacji.

---

## 4. Efekty kształcenia

Po zakończeniu szkolenia uczestnik:
- projektuje i implementuje frontend w React z wykorzystaniem TypeScript, zarządzania stanem i routingu,
- buduje aplikacje Full-Stack w Next.js,
- tworzy REST API w Node.js/Express z walidacją i uwierzytelnianiem JWT,
- modeluje dane relacyjne i korzysta z Prisma ORM do pracy z PostgreSQL,
- pisze testy jednostkowe i komponentowe (Jest, RTL),
- pracuje zespołowo z użyciem Git/GitHub (branch, PR, code review),
- konteneryzuje aplikację w Docker i konfiguruje podstawowy pipeline CI/CD,
- rozróżnia podejścia OLTP/OLAP/data lake i rozumie ich miejsce w architekturze systemu,
- integruje aplikację z zewnętrznym API AI.

## 5. Wymagania wstępne

Podstawy JavaScript (ES6+), podstawy HTML/CSS, podstawy programowania obiektowego — zakładane na podstawie programu studiów (VI semestr Informatyki).

## 6. Weryfikacja efektów

Projekt progresywny budowany na bieżąco jest jednocześnie formą weryfikacji — każdy moduł kończy się konkretnym, działającym przyrostem kodu. Na zakończenie Części II — krótka prezentacja/demo gotowej aplikacji (do ustalenia, czy w ramach godzin szkolenia czy jako zadanie domowe podsumowujące).

## 7. Narzędzia i środowisko

Node.js LTS, VS Code, Git/GitHub, Docker Desktop, PostgreSQL (lokalnie lub w kontenerze), konto na platformie deploymentowej (Vercel/Render — darmowy tier), klucz API do wybranego dostawcy AI (do zapewnienia przez prowadzącego na czas warsztatu lub konto testowe).

---

*Dokument roboczy — do dalszych ustaleń: dokładny harmonogram dzienny (godziny zajęć), wybór tematu projektu progresywnego, wybór dostawcy API AI, ewentualne dostosowanie wagi modułu o hurtowniach/jeziorach danych.*

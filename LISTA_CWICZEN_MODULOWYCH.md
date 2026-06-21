# Lista krótkich ćwiczeń modułowych

Poniższe ćwiczenia są pomyślane jako krótkie zadania wdrożeniowe na koniec każdego modułu. Każde ćwiczenie powinno dać uczestnikom mały, konkretny efekt w repozytorium.

## Moduł 1. Wprowadzenie, środowisko, Git/GitHub

1. Sklonuj repozytorium projektu i uruchom aplikację lokalnie.
2. Utwórz branch `feature/first-change`.
3. Zmień krótki tekst w pliku README albo dodaj notatkę `notes/intro.md`.
4. Zrób commit i sprawdź `git status`.

**Efekt:** uczestnik ma pierwszy branch i pierwszy własny commit.

## Moduł 2. React - fundamenty i architektura komponentowa

1. Utwórz komponent `TaskCard`.
2. Przekaż do niego dane przez propsy: tytuł, opis i status.
3. Wyrenderuj minimum trzy przykładowe zadania z tablicy.
4. Dodaj prosty styl dla statusu.

**Efekt:** uczestnik rozumie komponenty, propsy i renderowanie listy.

## Moduł 3. Zarządzanie stanem i routing SPA

1. Dodaj dwie trasy: lista projektów i szczegóły projektu.
2. Przekaż `projectId` z URL do strony szczegółów.
3. Dodaj prosty globalny stan użytkownika w Context API.
4. Ukryj stronę szczegółów, jeśli użytkownik nie jest zalogowany.

**Efekt:** aplikacja ma podstawowy routing i prostą ochronę widoku.

## Moduł 4. TypeScript - podstawy

1. Zdefiniuj typy `TaskStatus`, `TaskPriority` i interfejs `Task`.
2. Otypuj tablicę przykładowych zadań jako `Task[]`.
3. Dodaj funkcję `formatStatus(status: TaskStatus)`.
4. Uruchom typecheck i popraw ewentualne błędy.

**Efekt:** uczestnik widzi praktyczną wartość typów domenowych.

## Moduł 5. TypeScript w React

1. Otypuj propsy komponentu `TaskCard`.
2. Otypuj stan formularza dodawania zadania.
3. Otypuj handler `onSubmit` jako `FormEvent<HTMLFormElement>`.
4. Dodaj prosty custom hook z typem generycznym.

**Efekt:** komponenty React są bezpiecznie typowane.

## Moduł 6. Integracja z API i operacje asynchroniczne

1. Utwórz funkcję `apiGet`.
2. Pobierz listę zadań z testowego API.
3. Dodaj stany `loading`, `error` i `data`.
4. Wyświetl osobny komunikat dla błędu połączenia.

**Efekt:** uczestnik zna podstawowy wzorzec `fetch` + `async/await`.

## Moduł 7. Next.js - aplikacja Full-Stack

1. Przenieś jeden widok aplikacji do katalogu `app/`.
2. Dodaj layout z nagłówkiem aplikacji.
3. Utwórz Route Handler `GET /api/health`.
4. Wyświetl wynik endpointu na stronie testowej.

**Efekt:** uczestnik rozumie App Router i pierwszy backend w Next.js.

## Moduł 8. Node.js + Express - REST API

1. Utwórz serwer Express z endpointem `/health`.
2. Dodaj router `/tasks`.
3. Obsłuż `GET /tasks` i `POST /tasks`.
4. Dodaj walidację danych wejściowych przez Zod.

**Efekt:** powstaje samodzielne REST API poza frontendem.

## Moduł 9. Uwierzytelnianie i autoryzacja JWT

1. Dodaj endpoint `POST /auth/register`.
2. Zahashuj hasło przy użyciu bcrypt.
3. Dodaj endpoint `POST /auth/login`, który zwraca JWT.
4. Zabezpiecz jeden endpoint middlewarem `requireAuth`.

**Efekt:** uczestnik rozumie pełny przepływ rejestracja -> login -> token -> chroniony zasób.

## Moduł 10. PostgreSQL i Prisma ORM

1. Dodaj modele `User`, `Project` i `Task` w `schema.prisma`.
2. Wygeneruj migrację.
3. Dodaj seed z jednym użytkownikiem i dwoma projektami.
4. Zamień jeden endpoint Expressa z danych w pamięci na zapytanie Prisma.

**Efekt:** aplikacja zaczyna korzystać z prawdziwej bazy danych.

## Moduł 11. Testowanie - Jest i React Testing Library

1. Napisz test renderowania komponentu `TaskCard`.
2. Napisz test kliknięcia albo wysłania formularza.
3. Napisz test walidacji schematu Zod.
4. Uruchom testy lokalnie i popraw błędy.

**Efekt:** uczestnik ma pierwsze testy komponentu i logiki backendowej.

## Moduł 12. Docker i konteneryzacja

1. Dodaj Dockerfile dla backendu.
2. Dodaj Dockerfile dla frontendu.
3. Utwórz `docker-compose.yml` z usługami `client`, `server` i `db`.
4. Przekaż `DATABASE_URL` przez zmienne środowiskowe.

**Efekt:** projekt można uruchamiać jako zestaw kontenerów.

## Moduł 13. CI/CD - podstawy

1. Dodaj workflow GitHub Actions `ci.yml`.
2. Skonfiguruj job dla klienta: install, typecheck, test, build.
3. Skonfiguruj job dla serwera: install, Prisma generate, typecheck, test, build.
4. Dodaj job sprawdzający build Docker Compose.

**Efekt:** repozytorium ma automatyczną kontrolę jakości przy pushu i PR.

## Moduł 14. Hurtownie danych i jeziora danych

1. Dodaj prosty model lub tabelę `ActivityLog`.
2. Zapisz zdarzenie po utworzeniu zadania.
3. Dodaj endpoint ze statystyką liczby zadań per status.
4. Przygotuj prosty eksport logów do pliku JSON.

**Efekt:** uczestnik widzi różnicę między danymi operacyjnymi a analitycznymi.

## Moduł 15. Integracja z zewnętrznymi API AI

1. Dodaj serwis backendowy do komunikacji z API AI.
2. Przechowuj klucz API wyłącznie po stronie serwera.
3. Dodaj endpoint podsumowujący opis zadania.
4. Dodaj przycisk w UI, który wyświetla podsumowanie.

**Efekt:** aplikacja ma prostą funkcję AI bez ujawniania sekretów w frontendzie.

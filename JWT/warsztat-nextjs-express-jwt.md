# Warsztat: Integracja Next.js (TravelLog) z API Express (Shop & Blog) — logowanie i JWT

Łączymy dwie wcześniej zbudowane aplikacje:
- **Next.js „TravelLog"** (frontend, `http://localhost:3000`) — z poprzednich warsztatów,
- **Express „Shop & Blog"** (backend API, `http://localhost:4000`) — z poprzedniego warsztatu.

Cel: Next.js ma się zalogować do Express, **pobrać token JWT** i **podpinać go pod żądania** do chronionych endpointów (`GET /api/produkty`) — aż do momentu wylogowania. Endpointy publiczne (`GET /api/artykuly`, `POST /api/produkty`, `POST /api/artykuly`) zostają dostępne bez logowania.

> **Dlaczego token w pamięci/sessionStorage, a nie tylko cookie?**
> Express już ustawia `httpOnly` cookie przy logowaniu (z poprzedniego warsztatu) — przeglądarka wysyłałaby je automatycznie nawet bez żadnej dodatkowej pracy, bo `localhost:3000` i `localhost:4000` są tym samym „site" (różnią się tylko portem). Ale w realnych projektach frontend i backend często są na **różnych domenach**, gdzie automatyczne cookie nie zawsze zadziała (ograniczenia `SameSite`). Dlatego w tym warsztacie uczymy się **uniwersalnego wzorca**: token JWT pobrany w odpowiedzi logowania, przechowywany po stronie klienta i ręcznie dołączany w nagłówku `Authorization: Bearer <token>`. Ten wzorzec działa zawsze, niezależnie od konfiguracji domen.

Każde zadanie ma: **opis i instrukcję** oraz **ukryte rozwiązanie**.

---

## Zadanie 0 — Konfiguracja środowiska (dwa serwery równolegle)

### Opis i instrukcja

Uruchom obie aplikacje jednocześnie, w dwóch terminalach:

```bash
# terminal 1
cd express-shop-blog
npm run dev    # http://localhost:4000

# terminal 2
cd travel-log
npm run dev    # http://localhost:3000
```

W projekcie Next.js dodaj plik `.env.local` z adresem API Express. Zmienna musi mieć prefiks `NEXT_PUBLIC_`, żeby była dostępna w komponentach klienckich (przeglądarka potrzebuje znać adres Express, żeby wykonać `fetch`).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/.env.local`**
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Zmienne bez prefiksu `NEXT_PUBLIC_` są dostępne tylko po stronie serwera (w komponentach serwerowych) — tutaj potrzebujemy adresu również w komponentach klienckich (formularz logowania, pobieranie produktów po zalogowaniu), więc prefiks jest wymagany.

</details>

---

## Zadanie 1 — Drobna modyfikacja Express: token JWT w odpowiedzi logowania

### Opis i instrukcja

Backend Express z poprzedniego warsztatu zwraca token **tylko** w `httpOnly` cookie — kod JavaScript po stronie klienta nie ma do niego dostępu (to zresztą zaleta cookie `httpOnly` — chroni przed atakami XSS). Żeby Next.js mógł **explicit** zarządzać tokenem, zmodyfikuj endpoint logowania w Express, by zwracał token **również w treści odpowiedzi JSON**.

Zmodyfikuj też middleware `requireAuth`, by przyjmował token z nagłówka `Authorization: Bearer <token>` (oprócz dotychczasowego cookie) — tak, żeby działały oba mechanizmy.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`express-shop-blog/src/controllers/auth.controller.js`** (zmodyfikowana funkcja `login`)
```js
export function login(req, res) {
  const { login, haslo } = req.body;

  const validLogin = login === process.env.ADMIN_USER;
  const validPassword = haslo === process.env.ADMIN_PASSWORD;

  if (!validLogin || !validPassword) {
    logEvent(`Nieudane logowanie dla loginu: ${login}`);
    return res.status(401).json({ error: 'Nieprawidłowy login lub hasło' });
  }

  const token = jwt.sign({ login }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Cookie zostaje — przydatne np. przy żądaniach z poziomu serwera Next.js.
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000,
  });

  logEvent(`Zalogowano użytkownika: ${login}`);

  // Token zwracamy też w body — tu Next.js (po stronie klienta) go odczyta i zapamięta.
  res.json({ message: 'Zalogowano pomyślnie', token });
}
```

**`express-shop-blog/src/middleware/auth.js`** (zmodyfikowany, obsługuje cookie i nagłówek)
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

Reszta aplikacji Express (routery, walidacja Zod, logger, CORS) zostaje bez zmian.

</details>

---

## Zadanie 2 — Klient API w Next.js

### Opis i instrukcja

Stwórz w Next.js plik pomocniczy `app/lib/api.ts` z funkcją `apiFetch`, która automatycznie dołącza nagłówek `Authorization`, jeśli przekażesz jej token. Wszystkie wywołania do Express będą przechodzić przez tę funkcję — unikamy powtarzania konfiguracji nagłówków w każdym komponencie.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/lib/api.ts`**
```ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function apiFetch(
  path: string,
  token: string | null,
  options: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(`${API_URL}${path}`, { ...options, headers });
}
```

</details>

---

## Zadanie 3 — Kontekst autoryzacji (`AuthContext`)

### Opis i instrukcja

Stwórz kontekst React `AuthContext`, który:
1. Przechowuje token JWT w stanie (`useState`).
2. Przy starcie aplikacji odczytuje token z `sessionStorage` (żeby przetrwał odświeżenie strony, ale **nie** przetrwał zamknięcia karty/przeglądarki — zgodnie z założeniem „do czasu wylogowania").
3. Udostępnia funkcje `login(login, haslo)` i `logout()`.
4. Udostępnia flagę `isLoggedIn`.

Funkcja `login` wywołuje `POST /api/auth/login` na Express, zapisuje otrzymany token w stanie i w `sessionStorage`. Funkcja `logout` czyści token z obu miejsc.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/context/AuthContext.tsx`**
```tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '@/app/lib/api';

const STORAGE_KEY = 'travel-log-jwt';

type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  login: (login: string, haslo: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // Odtworzenie sesji po odświeżeniu strony (sessionStorage przetrwa refresh,
  // ale nie przetrwa zamknięcia karty — to jest "do czasu wylogowania").
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
  }, []);

  async function login(loginValue: string, haslo: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: loginValue, haslo }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Logowanie nie powiodło się');
    }

    const data = await res.json();
    setToken(data.token);
    sessionStorage.setItem(STORAGE_KEY, data.token);
  }

  function logout() {
    setToken(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth musi być użyty wewnątrz <AuthProvider>');
  }
  return ctx;
}
```

</details>

---

## Zadanie 4 — Podłączenie `AuthProvider` w głównym layoucie

### Opis i instrukcja

Owiń całą aplikację providerem `AuthProvider` w `app/layout.tsx`, żeby kontekst autoryzacji był dostępny na każdej stronie.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/layout.tsx`** (fragment)
```tsx
import { AuthProvider } from './context/AuthContext';
import Nav from './components/Nav';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <AuthProvider>
          <header>
            <Nav />
          </header>
          {children}
          <footer>
            <p>© TravelLog 2026 — projekt warsztatowy Next.js + Express</p>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
```

`AuthProvider` musi obejmować `Nav` (skoro pokażemy w nim przycisk „Wyloguj") oraz `children` (strony, które będą korzystać z `useAuth`).

</details>

---

## Zadanie 5 — Strona logowania `/logowanie`

### Opis i instrukcja

Stwórz stronę z formularzem logowania (login + hasło). Po pomyślnym zalogowaniu przekieruj użytkownika na `/produkty`. W razie błędu wyświetl komunikat.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/logowanie/page.tsx`**
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function LogowaniePage() {
  const [login, setLogin] = useState('');
  const [haslo, setHaslo] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login: doLogin } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await doLogin(login, haslo);
      router.push('/produkty');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Coś poszło nie tak');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Logowanie</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </main>
  );
}
```

</details>

---

## Zadanie 6 — Chroniona strona `/produkty` (dane z Express, wymaga JWT)

### Opis i instrukcja

Stwórz stronę `/produkty`, która:
1. Jeśli użytkownik **nie jest zalogowany** (`isLoggedIn === false`) — pokazuje komunikat z linkiem do `/logowanie`, bez wywoływania API.
2. Jeśli jest zalogowany — pobiera `GET /api/produkty` z Express przez `apiFetch`, dołączając token w nagłówku `Authorization`.

To musi być komponent **kliencki** — token żyje w przeglądarce (kontekst React + `sessionStorage`), więc komponent serwerowy nie miałby do niego dostępu.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/produkty/page.tsx`**
```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { apiFetch } from '@/app/lib/api';

type Produkt = {
  id: number;
  nazwa: string;
  cena: number;
};

export default function ProduktyPage() {
  const { token, isLoggedIn } = useAuth();
  const [produkty, setProdukty] = useState<Produkt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    apiFetch('/api/produkty', token)
      .then(async (res) => {
        if (!res.ok) throw new Error('Nie udało się pobrać produktów');
        return res.json();
      })
      .then(setProdukty)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn, token]);

  if (!isLoggedIn) {
    return (
      <main>
        <h1>Produkty</h1>
        <p>
          Ta lista wymaga zalogowania. <Link href="/logowanie">Zaloguj się</Link>,
          żeby zobaczyć produkty.
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Produkty (dane z Express)</h1>
      {loading && <p>Wczytywanie...</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <ul>
        {produkty.map((p) => (
          <li key={p.id}>
            {p.nazwa} — {p.cena} zł
          </li>
        ))}
      </ul>
    </main>
  );
}
```

</details>

---

## Zadanie 7 — Strona publiczna `/artykuly-z-api` (bez logowania)

### Opis i instrukcja

Dla kontrastu — stwórz stronę, która pokazuje listę artykułów z Express (`GET /api/artykuly`), endpoint **publiczny**, bez żadnego logowania. Tę stronę możesz zaimplementować jako komponent **serwerowy** — nie potrzebuje tokena, więc nie ma znaczenia, że token żyje tylko w przeglądarce.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/artykuly-z-api/page.tsx`**
```tsx
type Artykul = {
  id: number;
  tytul: string;
  tresc: string;
};

async function getArtykuly(): Promise<Artykul[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  const res = await fetch(`${API_URL}/api/artykuly`, { cache: 'no-store' });
  return res.json();
}

export default async function ArtykulyZApiPage() {
  const artykuly = await getArtykuly();

  return (
    <main>
      <h1>Artykuły (dane z Express, endpoint publiczny)</h1>
      <ul>
        {artykuly.map((a) => (
          <li key={a.id}>
            <strong>{a.tytul}</strong>
            <p>{a.tresc}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

Zwróć uwagę na różnicę względem `/produkty`: tu nie ma żadnego sprawdzania `isLoggedIn` ani nagłówka `Authorization` — bo endpoint Express nie tego nie wymaga.

</details>

---

## Zadanie 8 — Nawigacja: „Zaloguj" / „Wyloguj" w zależności od stanu

### Opis i instrukcja

Zmodyfikuj komponent `Nav`, aby:
- pokazywał link „Zaloguj" prowadzący do `/logowanie`, gdy użytkownik nie jest zalogowany,
- pokazywał przycisk „Wyloguj" (wywołujący `logout()` z kontekstu), gdy jest zalogowany,
- dodaj link do `/produkty`.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/components/Nav.tsx`** (zmodyfikowany)
```tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const links = [
  { href: '/', label: 'Start' },
  { href: '/blog', label: 'Blog' },
  { href: '/destynacje', label: 'Destynacje' },
  { href: '/produkty', label: 'Produkty' },
  { href: '/artykuly-z-api', label: 'Artykuły (Express)' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <nav>
      <ul>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{ fontWeight: isActive ? 'bold' : 'normal' }}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Wyloguj</button>
          ) : (
            <Link href="/logowanie">Zaloguj</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
```

</details>

---

## Zadanie 9 — Obsługa wygasłego/nieprawidłowego tokena

### Opis i instrukcja

Token JWT ma ograniczony czas życia (`expiresIn: '1h'` po stronie Express). Zmodyfikuj stronę `/produkty`, by w przypadku odpowiedzi `401` z Express **automatycznie wylogowywała** użytkownika (czyści token z kontekstu) i przekierowywała na `/logowanie` — zamiast tylko wyświetlać błąd.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`travel-log/app/produkty/page.tsx`** (zmodyfikowany fragment `useEffect`)
```tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { apiFetch } from '@/app/lib/api';

type Produkt = {
  id: number;
  nazwa: string;
  cena: number;
};

export default function ProduktyPage() {
  const { token, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [produkty, setProdukty] = useState<Produkt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;

    setLoading(true);
    apiFetch('/api/produkty', token)
      .then(async (res) => {
        if (res.status === 401) {
          // Token wygasł albo jest nieprawidłowy — wyloguj i odeślij do logowania
          logout();
          router.push('/logowanie');
          return null;
        }
        if (!res.ok) throw new Error('Nie udało się pobrać produktów');
        return res.json();
      })
      .then((data) => {
        if (data) setProdukty(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [isLoggedIn, token, logout, router]);

  // ... reszta komponentu bez zmian (warunek !isLoggedIn, renderowanie listy)
}
```

</details>

---

## Podsumowanie warsztatu

Po wykonaniu wszystkich zadań masz dwie współpracujące aplikacje, które demonstrują:
- pobranie tokena JWT podczas logowania i jego przechowywanie po stronie klienta (`sessionStorage` + React Context),
- ręczne dołączanie tokena w nagłówku `Authorization: Bearer` do żądań chronionych,
- rozróżnienie endpointów chronionych (`/produkty`) i publicznych (`/artykuly-z-api`) po stronie konsumenta API,
- reaktywną nawigację zmieniającą się w zależności od stanu zalogowania,
- obsługę wygasłego tokena z automatycznym wylogowaniem,
- pracę dwóch niezależnych aplikacji (Next.js + Express) komunikujących się przez REST API i CORS.

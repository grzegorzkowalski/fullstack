# Warsztat: Next.js App Router — „TravelLog"

Temat warsztatu: prosty **blog podróżniczy**. Będziemy budować aplikację krok po kroku — od inicjalizacji projektu, przez routing, layouty, pliki specjalne, komponenty serwerowe/klienckie, tryby renderowania, aż po własne API.

Każde zadanie ma: **opis i instrukcję** oraz **ukryte rozwiązanie** (kliknij, aby rozwinąć).

Struktura aplikacji, którą zbudujemy:

```
/                    -> Strona główna
/blog                -> Lista wpisów (collection route, własny layout)
/blog/[id]           -> Pojedynczy wpis (segment dynamiczny)
/o-mnie              -> O mnie
/o-mnie/cv           -> Trasa zagnieżdzona (statyczna)
/kontakt             -> Kontakt
/destynacje          -> Lista miejsc z API + formularz dodawania (POST)
/api/destynacje      -> Route Handler (GET/POST)
```

---

## Zadanie 0 — Inicjalizacja projektu

### Opis i instrukcja

Stwórz nowy projekt Next.js z TypeScript, App Router i Tailwind (opcjonalnie).

```bash
npx create-next-app@latest travel-blog
cd travel-blog
npm run dev
```

Podczas instalacji wybierz:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes** (lub No, jeśli wolisz czysty CSS)
- `src/` directory: dowolnie
- App Router: **Yes**

Sprawdź, że aplikacja startuje na `http://localhost:3000`.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

Po instalacji powinniśmy mieć strukturę:

```
app/
  layout.tsx
  page.tsx
  globals.css
```

Uruchomienie serwera deweloperskiego:

```bash
npm run dev
```

W przeglądarce pod `http://localhost:3000` powinna wyświetlić się domyślna strona startowa Next.js.

</details>

---

## Zadanie 1 — Cztery podstrony

### Opis i instrukcja

Stwórz cztery podstawowe strony:
- `/` — strona główna z krótkim opisem bloga
- `/blog` — lista wpisów (na razie statyczna tablica)
- `/o-mnie` — informacje o autorze
- `/kontakt` — formularz/dane kontaktowe

Każda strona to plik `page.tsx` w odpowiednim folderze w `app/`.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/page.tsx`**
```tsx
export default function HomePage() {
  return (
    <main>
      <h1>TravelLog</h1>
      <p>Witaj na blogu podróżniczym! Tu dzielę się relacjami z wyjazdów.</p>
    </main>
  );
}
```

**`app/blog/page.tsx`**
```tsx
const posts = [
  { id: '1', title: 'Wyspy Lofoty — pierwsza wyprawa' },
  { id: '2', title: 'Tokio w 5 dni' },
  { id: '3', title: 'Drogą przez Bałkany' },
];

export default function BlogPage() {
  return (
    <main>
      <h1>Wpisy na blogu</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
```

**`app/o-mnie/page.tsx`**
```tsx
export default function AboutPage() {
  return (
    <main>
      <h1>O mnie</h1>
      <p>Nazywam się Ania i od 8 lat podróżuję, opisując wyjazdy na tym blogu.</p>
    </main>
  );
}
```

**`app/kontakt/page.tsx`**
```tsx
export default function ContactPage() {
  return (
    <main>
      <h1>Kontakt</h1>
      <p>Napisz do mnie: kontakt@travel-blog.example.com</p>
    </main>
  );
}
```

</details>

---

## Zadanie 2 — Trasa zagnieżdzona (statyczna)

### Opis i instrukcja

Dodaj zagnieżdżoną, statyczną podstronę `/o-mnie/cv`, na której znajdzie się krótkie CV autora. To **nie** jest segment dynamiczny — to po prostu kolejny folder zagnieżdżony w strukturze `app/`.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/o-mnie/cv/page.tsx`**
```tsx
export default function CvPage() {
  return (
    <main>
      <h1>Moje CV</h1>
      <ul>
        <li>2017–dziś: blog TravelLog</li>
        <li>Odwiedzone kraje: 32</li>
        <li>Język podróżniczy: angielski, hiszpański</li>
      </ul>
    </main>
  );
}
```

Strona będzie dostępna pod adresem `/o-mnie/cv` — sam fakt umieszczenia folderu `cv` wewnątrz `o-mnie` tworzy trasę zagnieżdżoną, bez żadnej dodatkowej konfiguracji routingu.

</details>

---

## Zadanie 3 — Segment dynamiczny `[id]`

### Opis i instrukcja

Dodaj stronę `/blog/[id]`, która odczyta `id` z adresu URL i wyświetli odpowiadający wpis. Pamiętaj, że w Next.js 15+ `params` jest **Promisem**, więc funkcja komponentu musi być `async`, a `params` należy odczekać (`await`).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/blog/[id]/page.tsx`**
```tsx
const posts = [
  { id: '1', title: 'Wyspy Lofoty — pierwsza wyprawa', content: 'Relacja z Lofotów...' },
  { id: '2', title: 'Tokio w 5 dni', content: 'Co zobaczyć w Tokio...' },
  { id: '3', title: 'Drogą przez Bałkany', content: 'Trasa przez Bałkany...' },
];

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return <h1>Wpis nie znaleziony</h1>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

Test: wejście na `/blog/2` powinno wyświetlić wpis o Tokio.

</details>

---

## Zadanie 4 — Nawigacja: `Link` i `usePathname`

### Opis i instrukcja

Stwórz komponent `Nav`, który wyświetli linki do wszystkich czterech podstron oraz podświetli aktywny link na podstawie aktualnej trasy. Użyj komponentu `Link` z `next/link` (zamiast `<a>`, by uniknąć przeładowania strony) oraz hooka `usePathname` z `next/navigation` do odczytu aktualnego URL i podświetlenia aktywnej pozycji w menu.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/components/Nav.tsx`**
```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Start' },
  { href: '/blog', label: 'Blog' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none' }}>
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
      </ul>
    </nav>
  );
}
```

`usePathname` działa tylko w komponencie klienckim, więc plik musi zaczynać się od `'use client'`.

</details>

---

## Zadanie 5 — Layout wspólny i layout zagnieżdżony dla kolekcji `/blog`

### Opis i instrukcja

1. W głównym `app/layout.tsx` umieść `Nav` (wspólny dla całej aplikacji) oraz wspólny nagłówek/stopkę.
2. Stwórz **dodatkowy layout tylko dla `/blog/*`** (czyli `app/blog/layout.tsx`), który doda np. boczny panel z kategoriami — widoczny zarówno na liście wpisów, jak i na każdym pojedynczym wpisie, ale nie na innych podstronach.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/layout.tsx`** (layout główny — obejmuje całą aplikację)
```tsx
import Nav from './components/Nav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <header>
          <Nav />
        </header>
        {children}
        <footer>
          <p>© TravelLog 2026</p>
        </footer>
      </body>
    </html>
  );
}
```

**`app/blog/layout.tsx`** (layout zagnieżdżony — tylko dla trasy `/blog` i jej podstron)
```tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <aside>
        <h3>Kategorie</h3>
        <ul>
          <li>Europa</li>
          <li>Azja</li>
          <li>Ameryka Południowa</li>
        </ul>
      </aside>
      <div>{children}</div>
    </div>
  );
}
```

Dzięki zagnieżdżeniu Next.js automatycznie renderuje `RootLayout` → `BlogLayout` → `page.tsx`, więc boczny panel kategorii pojawi się na `/blog` i `/blog/[id]`, ale nie na `/o-mnie` czy `/kontakt`.

</details>

---

## Zadanie 6 — Pliki specjalne: `loading`, `error`, `not-found`

### Opis i instrukcja

W folderze `app/blog/[id]/` dodaj trzy pliki specjalne:
- `loading.tsx` — wyświetlany automatycznie podczas wczytywania danych (np. fetchu w komponencie serwerowym)
- `error.tsx` — wyświetlany, jeśli renderowanie strony wyrzuci błąd
- `not-found.tsx` — wyświetlany, gdy wywołasz funkcję `notFound()` z `next/navigation` (np. gdy wpis o podanym `id` nie istnieje)

Zmodyfikuj `page.tsx`, aby wywoływało `notFound()` zamiast zwracać własny komunikat „nie znaleziono".

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/blog/[id]/loading.tsx`**
```tsx
export default function Loading() {
  return <p>Wczytywanie wpisu...</p>;
}
```

**`app/blog/[id]/error.tsx`**
```tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Coś poszło nie tak: {error.message}</h2>
      <button onClick={() => reset()}>Spróbuj ponownie</button>
    </div>
  );
}
```

**`app/blog/[id]/not-found.tsx`**
```tsx
export default function NotFound() {
  return <h2>Nie znaleziono wpisu o podanym ID.</h2>;
}
```

**Zmodyfikowany `app/blog/[id]/page.tsx`**
```tsx
import { notFound } from 'next/navigation';

const posts = [
  { id: '1', title: 'Wyspy Lofoty — pierwsza wyprawa', content: 'Relacja z Lofotów...' },
  { id: '2', title: 'Tokio w 5 dni', content: 'Co zobaczyć w Tokio...' },
  { id: '3', title: 'Drogą przez Bałkany', content: 'Trasa przez Bałkany...' },
];

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

`error.tsx` musi być komponentem klienckim (`'use client'`) — to wymaganie Next.js, bo error boundary działa po stronie klienta.

</details>

---

## Zadanie 7 — Komponent serwerowy i komponent kliencki

### Opis i instrukcja

Dodaj na stronie wpisu (`/blog/[id]`) przycisk „Polub" (`LikeButton`), który zlicza polubienia w stanie lokalnym (`useState`). To musi być komponent **kliencki**, bo używa stanu i interakcji — zaimportuj go do strony wpisu, która pozostaje komponentem **serwerowym**.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/components/LikeButton.tsx`**
```tsx
'use client';

import { useState } from 'react';

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes((prev) => prev + 1)}>
      ❤️ {likes}
    </button>
  );
}
```

**`app/blog/[id]/page.tsx`** (fragment — dodanie przycisku)
```tsx
import LikeButton from '@/app/components/LikeButton';
// ... pozostały kod bez zmian

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton />
    </article>
  );
}
```

Strona `page.tsx` pozostaje komponentem serwerowym (brak `'use client'`), a interaktywna część (przycisk) jest „wyspą" kliencką osadzoną w renderowanym po stronie serwera drzewie komponentów. To kluczowa zasada App Routera: domyślnie wszystko jest serwerowe, a `'use client'` włącza interaktywność tylko tam, gdzie jest potrzebna.

</details>

---

## Zadanie 8 — Przełączanie trybów renderowania: SSG, SSR, ISR

### Opis i instrukcja

Zmodyfikuj stronę listy wpisów (`/blog`), żeby pobierała dane z (fikcyjnego) zewnętrznego API, i zademonstruj trzy tryby renderowania na tej samej stronie (po kolei, zamieniając fragment kodu):

1. **SSG** (Static Site Generation) — dane pobrane raz w czasie budowania, strona statyczna.
2. **SSR** (Server-Side Rendering) — dane pobierane na każde żądanie.
3. **ISR** (Incremental Static Regeneration) — strona statyczna, ale odświeżana w tle co określony czas.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**1. SSG — domyślne zachowanie `fetch` w Next.js (cache na zawsze, do następnego builda)**
```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts'); // domyślnie: force-cache
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p: { id: string; title: string }) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

**2. SSR — wymuszenie renderowania na każde żądanie**
```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store', // wyłącza cache — dane pobierane na każde żądanie
  });
  return res.json();
}

// alternatywnie na poziomie całej trasy:
export const dynamic = 'force-dynamic';
```

**3. ISR — strona statyczna, odświeżana co N sekund**
```tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 }, // odśwież dane nie częściej niż raz na 60 sekund
  });
  return res.json();
}
```

**Podsumowanie różnic:**

| Tryb | Opcja `fetch` | Kiedy dane są pobierane |
|------|---------------|--------------------------|
| SSG  | domyślnie / `cache: 'force-cache'` | Raz, w czasie budowania |
| SSR  | `cache: 'no-store'` lub `export const dynamic = 'force-dynamic'` | Na każde żądanie |
| ISR  | `next: { revalidate: N }` | Raz, a potem odświeżane w tle co `N` sekund |

</details>

---

## Zadanie 9 — Route Handler API: lista i dodawanie elementów (GET/POST)

### Opis i instrukcja

Stwórz Route Handler `app/api/destynacje/route.ts`, który:
- obsługuje `GET` — zwraca listę destynacji (przechowywaną w pamięci, np. tablica),
- obsługuje `POST` — dodaje nową destynację na podstawie danych z body żądania (JSON) i zwraca zaktualizowaną listę lub nowo dodany element.

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/api/destynacje/route.ts`**
```tsx
import { NextResponse } from 'next/server';

type Destynacja = {
  id: string;
  nazwa: string;
  kraj: string;
};

// Uwaga: tablica w pamięci resetuje się po restarcie serwera —
// to wystarcza na potrzeby warsztatu, w realnym projekcie użylibyśmy bazy danych.
let destynacje: Destynacja[] = [
  { id: '1', nazwa: 'Lofoty', kraj: 'Norwegia' },
  { id: '2', nazwa: 'Kioto', kraj: 'Japonia' },
];

export async function GET() {
  return NextResponse.json(destynacje);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.nazwa || !body.kraj) {
    return NextResponse.json(
      { error: 'Wymagane pola: nazwa, kraj' },
      { status: 400 }
    );
  }

  const nowaDestynacja: Destynacja = {
    id: String(destynacje.length + 1),
    nazwa: body.nazwa,
    kraj: body.kraj,
  };

  destynacje.push(nowaDestynacja);

  return NextResponse.json(nowaDestynacja, { status: 201 });
}
```

</details>

---

## Zadanie 10 — Wykorzystanie API w stronie `/destynacje`

### Opis i instrukcja

Stwórz stronę `/destynacje`, która:
1. Po stronie serwera pobiera i wyświetla listę destynacji z `/api/destynacje` (`GET`).
2. Zawiera formularz (komponent kliencki) do dodania nowej destynacji — wysyła `POST` do `/api/destynacje`, a po sukcesie odświeża listę (np. przez `router.refresh()`).

<details>
<summary>✅ Pokaż rozwiązanie</summary>

**`app/components/DodajDestynacje.tsx`** (komponent kliencki — formularz)
```tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DodajDestynacje() {
  const [nazwa, setNazwa] = useState('');
  const [kraj, setKraj] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch('/api/destynacje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nazwa, kraj }),
    });

    setNazwa('');
    setKraj('');
    router.refresh(); // odświeża dane komponentu serwerowego na tej samej stronie
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nazwa miejsca"
        value={nazwa}
        onChange={(e) => setNazwa(e.target.value)}
      />
      <input
        placeholder="Kraj"
        value={kraj}
        onChange={(e) => setKraj(e.target.value)}
      />
      <button type="submit">Dodaj</button>
    </form>
  );
}
```

**`app/destynacje/page.tsx`** (komponent serwerowy — lista + import formularza)
```tsx
import DodajDestynacje from '@/app/components/DodajDestynacje';

type Destynacja = {
  id: string;
  nazwa: string;
  kraj: string;
};

async function getDestynacje(): Promise<Destynacja[]> {
  const res = await fetch('http://localhost:3000/api/destynacje', {
    cache: 'no-store', // zawsze świeże dane (SSR) — lista zmienia się po dodaniu elementu
  });
  return res.json();
}

export default async function DestynacjePage() {
  const destynacje = await getDestynacje();

  return (
    <main>
      <h1>Miejsca do odwiedzenia</h1>
      <ul>
        {destynacje.map((d) => (
          <li key={d.id}>
            {d.nazwa} — {d.kraj}
          </li>
        ))}
      </ul>
      <DodajDestynacje />
    </main>
  );
}
```

Zwróć uwagę: `cache: 'no-store'` jest tu istotne — bez tego Next.js mógłby zbuforować pierwszą odpowiedź API (SSG) i nie pokazywać nowo dodanych destynacji bez przebudowania aplikacji.

</details>

---

## Podsumowanie warsztatu

Po wykonaniu wszystkich zadań masz aplikację, która demonstruje:
- routing oparty na strukturze folderów (App Router),
- trasy statyczne, zagnieżdżone i dynamiczne (`[id]`),
- nawigację z podświetlaniem aktywnej trasy,
- layouty wspólne i zagnieżdżone dla konkretnej kolekcji trasy,
- pliki specjalne `loading`, `error`, `not-found`,
- współpracę komponentów serwerowych i klienckich,
- trzy tryby renderowania danych: SSG, SSR, ISR,
- własne API (Route Handler) z metodami `GET` i `POST`,
- konsumowanie własnego API z komponentu serwerowego i odświeżanie danych po akcji klienckiej.

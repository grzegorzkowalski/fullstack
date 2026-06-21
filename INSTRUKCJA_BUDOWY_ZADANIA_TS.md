# DevTrack — zbuduj projekt od zera (15 zadań, TypeScript od startu)

To jest wersja instrukcji budowy projektu DevTrack w formacie ćwiczeń: każdy
checkpoint to jedno **Zadanie** z opisem, instrukcją (krokami **bez** pokazanego
kodu) i ukrytym fragmentem gotowego kodu, który możesz odsłonić, gdy chcesz
porównać swoje rozwiązanie albo się zablokujesz.

**Zasada pracy:** najpierw przeczytaj „Opis zadania” i „Instrukcję”, spróbuj
napisać kod samodzielnie, a dopiero potem kliknij **„📄 Pokaż gotowy kod”**.
Polecenia terminala (`npm install`, `git commit` itd.) są zawsze widoczne —
to nie jest „rozwiązanie”, tylko mechanika, którą i tak musisz wykonać.

**Zmiana względem poprzedniej wersji tej instrukcji:** projekt frontendowy
stawiamy od razu oficjalnym generatorem Vite z szablonem `react-ts` i piszemy
**od pierwszej linijki w TypeScript** — bez etapu „najpierw JS, potem
migracja”. To bardziej realistyczna ścieżka (tak zaczyna się większość nowych
projektów React). Jeśli porównujesz się ze starszą wersją repozytorium
referencyjnego: w **Zadaniach 1–4** zobaczysz różnice w nazwach plików
(`.tsx` od początku, a nie `.jsx`→`.tsx` po drodze) i nieco inny podział
treści (Zadanie 4 nie jest już „migracją”, tylko ćwiczeniem z typów
zaawansowanych). Od **Zadania 5** kod powinien znów zbiegać się do tego
samego stanu co w repo referencyjnym.

**Walidacja względem repozytorium referencyjnego** (jeśli masz pliki z poprzedniej
wersji projektu rozpakowane w `~/devtrack-reference`):
```bash
git -C ~/devtrack-reference checkout checkpoint-XX
diff -rq --exclude=node_modules --exclude=.next --exclude=dist \
  --exclude=.git --exclude=package-lock.json ~/devtrack ~/devtrack-reference
```

---

## Zadanie 1: Szkielet projektu — Vite (szablon `react-ts`) i pierwszy commit

### Opis zadania

Postawisz projekt React + TypeScript za pomocą oficjalnego generatora Vite —
to jest dokładnie to, co zrobiłbyś/abyś, zaczynając prawdziwy projekt od zera.
Generator daje Ci już gotowy `tsconfig.json`, `vite.config.ts` i całą
konfigurację TypeScript — Twoja praca to zrozumieć, co dostałeś/aś, posprzątać
domyślną zawartość (licznik kliknięć z szablonu) i zastąpić ją własnym
komponentem. Na końcu zrobisz pierwszy commit i nauczysz się podstawowego
przepływu pracy z Git (branch → commit → PR).

### Instrukcja

1. Wygeneruj projekt poleceniem `npm create vite@latest` z szablonem `react-ts`, w katalogu `client`.
2. Zainstaluj zależności i odpal `npm run dev` — sprawdź w przeglądarce domyślną stronę szablonu (licznik kliknięć).
3. Obejrzyj wygenerowaną strukturę: `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`. Zwróć uwagę, że `strict: true` jest już włączone domyślnie.
4. Usuń domyślną zawartość szablonu: licznik kliknięć w `App.tsx`, plik `src/App.css`, grafiki `src/assets/react.svg` i `public/vite.svg` (chyba że chcesz je zostawić — to nieistotne dla dalszych zadań).
5. Zastąp zawartość `App.tsx` własnym komponentem: nagłówek „DevTrack” i krótki opis projektu.
6. Uprość `index.css` do własnych, podstawowych stylów (kolory, czcionka, kontener `.app`) — możesz zostawić jeden plik CSS i usunąć `App.css`, jeśli wolisz prostszą strukturę.
7. W katalogu głównym repo (jeden poziom **nad** `client/`) dodaj `.gitignore` (m.in. `node_modules/`, `dist/`, `.env`).
8. Zainicjuj repo Git w katalogu głównym (jeśli jeszcze nie istnieje), zrób pierwszy commit i otaguj go jako `checkpoint-01`.
9. **Ćwiczenie z Git:** utwórz nowy branch, zmień podtytuł aplikacji, zrób commit, wypchnij branch i otwórz Pull Request do `main`.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**Komenda generująca projekt** (interaktywnie wybierz `React` → `TypeScript`, albo użyj flagi nieinteraktywnej jak poniżej):
```bash
npm create vite@latest client -- --template react-ts
cd client
npm install
```

To automatycznie tworzy (nie musisz pisać ręcznie):
- `client/package.json` — z `react`, `react-dom`, `typescript`, `vite`, `@vitejs/plugin-react`, `@types/react`, `@types/react-dom`
- `client/tsconfig.json` i `client/tsconfig.node.json`
- `client/vite.config.ts`
- `client/src/main.tsx`, `client/src/vite-env.d.ts`

**`client/tsconfig.json`** (wygenerowany, do wglądu — zwykle nie musisz go zmieniać)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**`client/src/main.tsx`** (wygenerowany — zwykle bez zmian)
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

**`client/src/App.tsx`** (zastępujesz domyślną treść szablonu)
```tsx
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>DevTrack</h1>
        <p>Mini-system zarządzania zadaniami projektowymi</p>
      </header>
      <main>
        <p>
          To jest szkielet startowy projektu DevTrack. W kolejnych modułach
          szkolenia ta aplikacja będzie rozwijana krok po kroku.
        </p>
      </main>
    </div>
  )
}

export default App
```

**`client/src/index.css`** (zastępujesz domyślną treść szablonu)
```css
:root {
  font-family: system-ui, -apple-system, sans-serif;
  color-scheme: light;
}

body {
  margin: 0;
  background: #f5f6fa;
  color: #1d1d1f;
}

.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.app-header h1 {
  margin-bottom: 0.25rem;
  color: #2b59ff;
}

.app-header p {
  color: #555;
  margin-top: 0;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background: #2b59ff;
  color: white;
  font-weight: 600;
}

button:hover {
  background: #1d40c4;
}

input, textarea, select {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.45rem 0.6rem;
  font-size: 0.95rem;
}
```

**`.gitignore`** (katalog główny repo, **nad** `client/`)
```
node_modules/
dist/
build/
.next/
*.log
.env
.env.local
coverage/
.DS_Store
```

**Komendy:**
```bash
npm create vite@latest client -- --template react-ts
cd client && npm install

rm -f src/App.css src/assets/react.svg public/vite.svg
rmdir src/assets 2>/dev/null

npm run dev   # sprawdź http://localhost:5173
cd ..

git init   # jeśli jeszcze nie zainicjowane
git add -A
git commit -m "checkpoint 1: szkielet projektu, Vite+React+TypeScript"
git tag checkpoint-01
```

</details>

---

## Zadanie 2: Lista zadań z formularzem dodawania (architektura komponentowa)

### Opis zadania

Zbudujesz pierwszą realną funkcjonalność aplikacji: listę zadań i formularz
dodawania nowych. Skupisz się na podziale na komponenty (kontener vs.
komponenty prezentacyjne) i przepływie danych przez propsy — **od razu z
pełnym typowaniem TypeScript**, bez etapu „najpierw na czysto, potem typy”.
Tworzysz tu również pierwszy centralny plik z typami domenowymi.

### Instrukcja

1. Stwórz plik `types.ts` z typami domenowymi: `TaskStatus` i `TaskPriority` jako unie literałów stringowych (`'TODO' | 'IN_PROGRESS' | 'DONE'` itd.) oraz interfejs `Task` (`id`, `title`, `description`, `status`, `priority`).
2. Stwórz plik z danymi mockowymi: tablica 3 przykładowych zadań typu `Task[]`.
3. Stwórz komponent `TaskItem` z otypowanym propsem `{ task: Task }` — wyświetla tytuł, opis i kolorowy „badge” statusu (np. `Record<TaskStatus, string>` na etykiety).
4. Stwórz komponent `TaskList` z propsem `{ tasks: Task[] }` — renderuje listę `TaskItem`, a gdy tablica jest pusta, pokazuje komunikat „Brak zadań”.
5. Stwórz komponent `TaskForm` z propsem `{ onAddTask: (task: Task) => void }`. Stan formularza w `useState` (z typowanym `useState<TaskPriority>('MEDIUM')` dla priorytetu). Handler `onSubmit` typu `FormEvent<HTMLFormElement>`, wywołuje `onAddTask` z nowym obiektem `Task` (`id` z `crypto.randomUUID()`, status domyślny `TODO`), czyści pola.
6. W komponencie `App`: `useState<Task[]>(initialTasks)`, funkcja dodająca nowe zadanie, renderuje `TaskList` i `TaskForm`.
7. Dodaj style dla nowych elementów.
8. Sprawdź `npx tsc --noEmit` (zero błędów) i `npm run build`, zrób commit i tag `checkpoint-02`.

**Zadanie dodatkowe:** dodaj możliwość oznaczenia zadania jako „zrobione” po kliknięciu (przekazanie typowanej funkcji-handlera z `App` do `TaskItem`, przez `TaskList`).

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`client/src/types.ts`**
```typescript
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}
```

**`client/src/data/mockTasks.ts`**
```typescript
import type { Task } from '../types'

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Skonfigurować repozytorium',
    description: 'Dodać .gitignore, README i pierwszy commit.',
    status: 'DONE',
    priority: 'MEDIUM'
  },
  {
    id: '2',
    title: 'Zaprojektować widok listy zadań',
    description: 'Layout listy + prosty formularz dodawania.',
    status: 'IN_PROGRESS',
    priority: 'HIGH'
  },
  {
    id: '3',
    title: 'Dodać routing aplikacji',
    description: 'Strony: lista projektów, szczegóły projektu, logowanie.',
    status: 'TODO',
    priority: 'LOW'
  }
]
```

**`client/src/components/TaskItem.tsx`**
```tsx
import type { Task, TaskStatus } from '../types'

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'Do zrobienia',
  IN_PROGRESS: 'W toku',
  DONE: 'Zrobione'
}

interface TaskItemProps {
  task: Task
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <li className={`task-item priority-${task.priority.toLowerCase()}`}>
      <div className="task-item-main">
        <strong>{task.title}</strong>
        <span className={`status-badge status-${task.status.toLowerCase()}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>
      <p>{task.description}</p>
    </li>
  )
}

export default TaskItem
```

**`client/src/components/TaskList.tsx`**
```tsx
import TaskItem from './TaskItem'
import type { Task } from '../types'

interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">Brak zadań. Dodaj pierwsze poniżej.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
}

export default TaskList
```

**`client/src/components/TaskForm.tsx`**
```tsx
import { useState, type FormEvent } from 'react'
import type { Task, TaskPriority } from '../types'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) return

    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'TODO',
      priority
    })

    setTitle('')
    setDescription('')
    setPriority('MEDIUM')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Nowe zadanie</h3>
      <input
        type="text"
        placeholder="Tytuł zadania"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Opis (opcjonalnie)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as TaskPriority)}>
        <option value="LOW">Niski priorytet</option>
        <option value="MEDIUM">Średni priorytet</option>
        <option value="HIGH">Wysoki priorytet</option>
      </select>
      <button type="submit">Dodaj zadanie</button>
    </form>
  )
}

export default TaskForm
```

**`client/src/App.tsx`**
```tsx
import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { initialTasks } from './data/mockTasks'
import type { Task } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  function handleAddTask(newTask: Task) {
    setTasks((prev) => [...prev, newTask])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>DevTrack</h1>
        <p>Mini-system zarządzania zadaniami projektowymi</p>
      </header>
      <main>
        <section>
          <h2>Zadania</h2>
          <TaskList tasks={tasks} />
        </section>
        <section>
          <TaskForm onAddTask={handleAddTask} />
        </section>
      </main>
    </div>
  )
}

export default App
```

**Dopisz do `client/src/index.css`:**
```css
.task-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-item {
  background: white;
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  border-left: 4px solid #ccc;
}

.task-item.priority-high { border-left-color: #e0483e; }
.task-item.priority-medium { border-left-color: #e0a93e; }
.task-item.priority-low { border-left-color: #4caf6f; }

.task-item-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.status-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-weight: 600;
  color: white;
}

.status-todo { background: #999; }
.status-in_progress { background: #2b59ff; }
.status-done { background: #4caf6f; }

.task-form {
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 420px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.empty-state {
  color: #888;
  font-style: italic;
}
```

**Komendy:**
```bash
npx tsc --noEmit --project client
npm run build --prefix client
git add -A && git commit -m "checkpoint 2: lista i formularz zadan (TypeScript od startu)"
git tag checkpoint-02
```

</details>

---

## Zadanie 3: Routing SPA i globalny stan użytkownika

### Opis zadania

Aplikacja dostanie kilka „stron” (logowanie, lista projektów, szczegóły
projektu) połączonych routingiem po stronie klienta (`react-router-dom`),
oraz globalny stan informujący, kto jest zalogowany — zarządzany przez React
Context, w pełni otypowany od pierwszej linijki.

### Instrukcja

1. Zainstaluj `react-router-dom` (wersja 6).
2. Dodaj do `types.ts` interfejsy `Project` (`id`, `name`, `description`) i `User` (`name`).
3. Stwórz dane mockowe projektów (`Project[]`, 2 projekty) i przebuduj dane zadań na `Record<string, Task[]>` pogrupowane po `projectId`.
4. Stwórz `UserContext`: typ `UserContextValue` (`{ user: User | null, login: (name: string) => void, logout: () => void }`), `createContext<UserContextValue | null>(null)`, provider z `useState<User | null>(null)`, hook `useUser()` rzucający błąd, gdy użyty poza providerem.
5. Stwórz komponent `ProtectedRoute` z propsem `{ children: ReactNode }` — przekierowuje na `/login`, jeśli `user` jest `null`.
6. Stwórz stronę `LoginPage` — formularz z jednym polem (imię), typowany handler submitu, po wysłaniu `login(name)` + `navigate('/projects')`.
7. Stwórz stronę `ProjectsPage` — lista projektów jako linki, przycisk wylogowania.
8. Stwórz stronę `ProjectDetailPage` — `useParams<{ id: string }>()`, `useState<Task[]>` zainicjalizowany danymi z mocka dla danego `id`.
9. Skonfiguruj routing w `App.tsx` (`/login`, `/projects`, `/projects/:id` — dwie ostatnie w `ProtectedRoute`), opakuj całość w `BrowserRouter` i `UserProvider` w `main.tsx`.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**Dopisz do `client/src/types.ts`:**
```typescript
export interface Project {
  id: string
  name: string
  description: string
}

export interface User {
  name: string
}
```

**`client/src/data/mockProjects.ts`**
```typescript
import type { Project } from '../types'

export const projects: Project[] = [
  { id: 'p1', name: 'Strona firmowa', description: 'Nowa strona marketingowa firmy.' },
  { id: 'p2', name: 'Aplikacja mobilna', description: 'MVP aplikacji do zamawiania jedzenia.' }
]
```

**`client/src/data/mockTasks.ts`** (zmiana struktury względem Zadania 2)
```typescript
import type { Task } from '../types'

export const tasksByProject: Record<string, Task[]> = {
  p1: [
    { id: '1', title: 'Skonfigurować repozytorium', description: 'Dodać .gitignore, README i pierwszy commit.', status: 'DONE', priority: 'MEDIUM' },
    { id: '2', title: 'Zaprojektować widok listy zadań', description: 'Layout listy + prosty formularz dodawania.', status: 'IN_PROGRESS', priority: 'HIGH' },
    { id: '3', title: 'Dodać routing aplikacji', description: 'Strony: lista projektów, szczegóły projektu, logowanie.', status: 'TODO', priority: 'LOW' }
  ],
  p2: [
    { id: '4', title: 'Makieta ekranu zamówienia', description: 'Figma — ekran wyboru dań i koszyka.', status: 'TODO', priority: 'MEDIUM' }
  ]
}
```

**`client/src/context/UserContext.tsx`**
```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface UserContextValue {
  user: User | null
  login: (name: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  function login(name: string) {
    setUser({ name })
  }

  function logout() {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser musi być użyty wewnątrz UserProvider')
  }
  return context
}
```

**`client/src/components/ProtectedRoute.tsx`**
```tsx
import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useUser } from '../context/UserContext'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUser()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
```

**`client/src/pages/LoginPage.tsx`**
```tsx
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function LoginPage() {
  const [name, setName] = useState('')
  const { login } = useUser()
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!name.trim()) return
    login(name.trim())
    navigate('/projects')
  }

  return (
    <div className="login-page">
      <h2>Logowanie</h2>
      <p className="hint">
        To jeszcze nie jest prawdziwe uwierzytelnianie — wpisz dowolną nazwę,
        aby „zalogować się”.
      </p>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Twoje imię"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Zaloguj</button>
      </form>
    </div>
  )
}

export default LoginPage
```

**`client/src/pages/ProjectsPage.tsx`**
```tsx
import { Link } from 'react-router-dom'
import { projects } from '../data/mockProjects'
import { useUser } from '../context/UserContext'

function ProjectsPage() {
  const { user, logout } = useUser()

  if (!user) return null

  return (
    <div>
      <div className="page-header">
        <h2>Twoje projekty</h2>
        <div>
          <span className="hint">Zalogowano jako {user.name}</span>{' '}
          <button onClick={logout}>Wyloguj</button>
        </div>
      </div>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectsPage
```

**`client/src/pages/ProjectDetailPage.tsx`**
```tsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { projects } from '../data/mockProjects'
import { tasksByProject } from '../data/mockTasks'
import type { Task } from '../types'

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)
  const [tasks, setTasks] = useState<Task[]>(id ? tasksByProject[id] ?? [] : [])

  function handleAddTask(newTask: Task) {
    setTasks((prev) => [...prev, newTask])
  }

  if (!project) {
    return <p>Nie znaleziono projektu.</p>
  }

  return (
    <div>
      <Link to="/projects" className="back-link">
        ← Wszystkie projekty
      </Link>
      <h2>{project.name}</h2>
      <p className="hint">{project.description}</p>
      <section>
        <h3>Zadania</h3>
        <TaskList tasks={tasks} />
      </section>
      <section>
        <TaskForm onAddTask={handleAddTask} />
      </section>
    </div>
  )
}

export default ProjectDetailPage
```

**`client/src/App.tsx`**
```tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>DevTrack</h1>
        <p>Mini-system zarządzania zadaniami projektowymi</p>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
```

**`client/src/main.tsx`**
```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { UserProvider } from './context/UserContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

**Komendy:**
```bash
npm install react-router-dom@6 --prefix client
npx tsc --noEmit --project client
npm run build --prefix client
git add -A && git commit -m "checkpoint 3: routing SPA i Context (TypeScript)"
git tag checkpoint-03
```

</details>

---

## Zadanie 4: TypeScript w praktyce — typy zaawansowane i porządkowanie

### Opis zadania

Skoro piszesz w TypeScript od pierwszej linijki, to zadanie nie jest już
„migracją” — jest **pogłębieniem**. Poćwiczysz typy narzędziowe (`Omit`,
`Partial`, `Pick`), typy dyskryminowane i dokręcenie konfiguracji kompilatora,
refaktoryzując kod, który już masz. To jest realna umiejętność: czytanie i
poprawianie istniejących typów, a nie tylko pisanie nowych od zera.

### Instrukcja

1. W `types.ts` zdefiniuj `NewTaskInput` jako `Omit<Task, 'id' | 'status'> & { status?: TaskStatus }` — typ danych wejściowych do tworzenia zadania (bez `id`, ze statusem opcjonalnym). Zastanów się, gdzie w `TaskForm` mógłbyś użyć tego typu zamiast pisać pola formularza „z palca”.
2. Dodaj typ `Comment` (`id`, `taskId`, `author`, `content`, `createdAt`) — nie używasz go jeszcze, przyda się w Zadaniu 10.
3. Przejrzyj `tsconfig.json` wygenerowany przez Vite (Zadanie 1) — sprawdź, czy `noUnusedLocals` i `noUnusedParameters` są włączone (Vite 5 włącza je domyślnie). Spróbuj uruchomić `npx tsc --noEmit` po dodaniu jakiejś nieużywanej zmiennej w kodzie — zobacz, jak kompilator reaguje.
4. Poćwicz typy dyskryminowane: napisz (na boku, niekoniecznie w aplikacji) mały przykład typu `type Result<T> = { success: true; data: T } | { success: false; error: string }` i funkcję, która go zwraca — to wzorzec, który zobaczysz ponownie przy obsłudze odpowiedzi API w Zadaniu 6.
5. Sprawdź, czy wszystkie pliki komponentów konsekwentnie korzystają z typów z `types.ts` (a nie duplikują definicji pól ad-hoc) — to dobry moment na małe refaktoryzacje, jeśli coś przegapiłeś/aś w Zadaniach 2–3.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**Dopisz do `client/src/types.ts`:**
```typescript
export interface Comment {
  id: string
  taskId: string
  author: string
  content: string
  createdAt: string
}

// Typ danych wejściowych do tworzenia zadania — bez `id` (generuje je backend/
// crypto.randomUUID()), ze statusem opcjonalnym (domyślnie TODO).
export type NewTaskInput = Omit<Task, 'id' | 'status'> & { status?: TaskStatus }
```

**Przykład typu dyskryminowanego** (ćwiczenie poglądowe, niekoniecznie commitowane do projektu):
```typescript
type Result<T> = { success: true; data: T } | { success: false; error: string }

function parseTaskPriority(value: string): Result<TaskPriority> {
  if (value === 'LOW' || value === 'MEDIUM' || value === 'HIGH') {
    return { success: true, data: value }
  }
  return { success: false, error: `Nieznany priorytet: ${value}` }
}

// TypeScript "zwęża" typ w każdej gałęzi if/else na podstawie pola `success`:
const result = parseTaskPriority('HIGH')
if (result.success) {
  console.log(result.data) // tu TS wie, że `data` istnieje
} else {
  console.log(result.error) // tu TS wie, że `error` istnieje
}
```

**Komendy:**
```bash
npx tsc --noEmit --project client
npm run build --prefix client
git add -A && git commit -m "checkpoint 4: typy narzedziowe, typy dyskryminowane, porzadki"
git tag checkpoint-04
```

</details>

---

## Zadanie 5: Generyczny custom hook i cykliczna zmiana statusu

### Opis zadania

Napiszesz swój pierwszy **generyczny** custom hook — uniwersalny mechanizm
do zarządzania listą elementów z `id`, który zadziała dla zadań, a w
przyszłości dla czegokolwiek innego, co ma pole `id`. Dodasz też nową
funkcję aplikacji: kliknięcie zadania cyklicznie zmienia jego status.

### Instrukcja

1. Stwórz hook `useEntityList<T extends { id: string }>(initial: T[])`, który zwraca: `items`, oraz funkcje `add(item)`, `remove(id)`, `update(id, changes: Partial<T>)`. To ćwiczenie z generyków — funkcja musi działać dla *jakiegokolwiek* typu `T`, o ile ma pole `id`.
2. Zmień `TaskItem` i `TaskList`, żeby przyjmowały opcjonalny prop-funkcję (`onClick`/`onTaskClick`) o sygnaturze `(taskId: string, currentStatus: TaskStatus) => void`. Gdy jest podana, element listy powinien mieć inny styl (np. kursor wskazujący klikalność).
3. W `ProjectDetailPage`: zamień ręczny `useState` na Twój nowy `useEntityList`. Napisz mapę `NEXT_STATUS: Record<TaskStatus, TaskStatus>` (TODO→IN_PROGRESS→DONE→TODO) i funkcję, która po kliknięciu zadania wywołuje `update` z nowym statusem.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`client/src/hooks/useEntityList.ts`**
```typescript
import { useState } from 'react'

export function useEntityList<T extends { id: string }>(initial: T[]) {
  const [items, setItems] = useState<T[]>(initial)

  function add(item: T): void {
    setItems((prev) => [...prev, item])
  }

  function remove(id: string): void {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function update(id: string, changes: Partial<T>): void {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...changes } : item))
    )
  }

  return { items, add, remove, update, setItems }
}
```

**`client/src/components/TaskItem.tsx`**
```tsx
import type { Task, TaskStatus } from '../types'

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'Do zrobienia',
  IN_PROGRESS: 'W toku',
  DONE: 'Zrobione'
}

interface TaskItemProps {
  task: Task
  onClick?: (taskId: string, currentStatus: TaskStatus) => void
}

function TaskItem({ task, onClick }: TaskItemProps) {
  return (
    <li
      className={`task-item priority-${task.priority.toLowerCase()} ${onClick ? 'clickable' : ''}`}
      onClick={() => onClick?.(task.id, task.status)}
    >
      <div className="task-item-main">
        <strong>{task.title}</strong>
        <span className={`status-badge status-${task.status.toLowerCase()}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>
      <p>{task.description}</p>
    </li>
  )
}

export default TaskItem
```

**`client/src/components/TaskList.tsx`**
```tsx
import TaskItem from './TaskItem'
import type { Task, TaskStatus } from '../types'

interface TaskListProps {
  tasks: Task[]
  onTaskClick?: (taskId: string, currentStatus: TaskStatus) => void
}

function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">Brak zadań. Dodaj pierwsze poniżej.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </ul>
  )
}

export default TaskList
```

**`client/src/pages/ProjectDetailPage.tsx`** (fragment zmian)
```tsx
import { useParams, Link } from 'react-router-dom'
import TaskList from '../components/TaskList'
import TaskForm from '../components/TaskForm'
import { projects } from '../data/mockProjects'
import { tasksByProject } from '../data/mockTasks'
import { useEntityList } from '../hooks/useEntityList'
import type { TaskStatus } from '../types'

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  TODO: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE: 'TODO'
}

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id)
  const { items: tasks, add: addTask, update: updateTask } = useEntityList(
    id ? tasksByProject[id] ?? [] : []
  )

  function handleCycleStatus(taskId: string, currentStatus: TaskStatus): void {
    updateTask(taskId, { status: NEXT_STATUS[currentStatus] })
  }

  if (!project) return <p>Nie znaleziono projektu.</p>

  return (
    <div>
      <Link to="/projects" className="back-link">← Wszystkie projekty</Link>
      <h2>{project.name}</h2>
      <p className="hint">{project.description}</p>
      <section>
        <h3>Zadania</h3>
        <p className="hint">Kliknij zadanie, aby przełączyć jego status.</p>
        <TaskList tasks={tasks} onTaskClick={handleCycleStatus} />
      </section>
      <section>
        <TaskForm onAddTask={addTask} />
      </section>
    </div>
  )
}

export default ProjectDetailPage
```

**Komendy:**
```bash
npx tsc --noEmit --project client
npm run build --prefix client
git add -A && git commit -m "checkpoint 5: generyczny hook, cykliczna zmiana statusu"
git tag checkpoint-05
```

</details>

---

## Zadanie 6: Integracja z API i operacje asynchroniczne

### Opis zadania

Dane mockowe trzymane w kodzie zamienisz na prawdziwe (na razie testowe)
REST API. Nauczysz się wzorca `fetch` + `async/await` + stany `loading`/`error`
w custom hookach — to jest najważniejszy, najczęściej powtarzany wzorzec w
aplikacjach React korzystających z backendu.

### Instrukcja

1. Zainstaluj `json-server` jako narzędzie deweloperskie — symuluje REST API na podstawie pliku JSON.
2. Dodaj do typu `Task` pole `projectId: string`. Usuń pliki z mockami (`mockProjects.ts`, `mockTasks.ts`) — dane przenosisz do pliku `db.json` (struktura: `{ "projects": [...], "tasks": [...] }`, każde zadanie z polem `projectId`).
3. Stwórz lekki wrapper na `fetch`: funkcje `apiGet`, `apiPost`, `apiPatch`, każda budująca URL z bazowego adresu (`http://localhost:4000`) i ścieżki, parsująca JSON, oraz rzucająca własny błąd (`ApiError`) gdy odpowiedź nie jest „ok”.
4. Stwórz trzy custom hooki: `useProjects()` (lista projektów), `useProject(id)` (jeden projekt), `useProjectTasks(projectId)` (zadania projektu + funkcje `addTask`, `updateTaskStatus`). Każdy: stan `data`/`loading`/`error`, `useEffect` z funkcją `async`, `try/catch/finally`.
5. Zaktualizuj strony (`ProjectsPage`, `ProjectDetailPage`), żeby korzystały z tych hooków zamiast statycznych importów, i wyświetlały komunikat podczas wczytywania oraz w razie błędu (np. „API nie jest uruchomione”).
6. Dodaj do `package.json` skrypt startujący `json-server` na porcie 4000, wskazujący na `db.json`.
7. Uruchom dwa procesy równolegle (mock API + aplikacja) i sprawdź w przeglądarce, że dane się wczytują.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`client/src/api/client.ts`**
```typescript
const API_BASE = 'http://localhost:4000'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(`Błąd API: ${res.status} ${res.statusText}`, res.status)
  }
  return res.json() as Promise<T>
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  return handleResponse<T>(res)
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return handleResponse<T>(res)
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  return handleResponse<T>(res)
}
```

**`client/src/hooks/useProjectTasks.ts`**
```typescript
import { useCallback, useEffect, useState } from 'react'
import { apiGet, apiPatch, apiPost } from '../api/client'
import type { Task, TaskStatus } from '../types'

export function useProjectTasks(projectId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  const refetch = useCallback(() => setVersion((v) => v + 1), [])

  useEffect(() => {
    if (!projectId) return
    let isMounted = true

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiGet<Task[]>(`/tasks?projectId=${projectId}`)
        if (isMounted) setTasks(data)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Nieznany błąd')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    load()
    return () => { isMounted = false }
  }, [projectId, version])

  async function addTask(task: Omit<Task, 'id' | 'projectId'>) {
    if (!projectId) return
    const created = await apiPost<Task>('/tasks', { ...task, projectId })
    setTasks((prev) => [...prev, created])
  }

  async function updateTaskStatus(taskId: string, status: TaskStatus) {
    const updated = await apiPatch<Task>(`/tasks/${taskId}`, { status })
    setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)))
  }

  return { tasks, loading, error, addTask, updateTaskStatus, refetch }
}
```

*(Analogicznie napisz `useProjects.ts` — `apiGet<Project[]>('/projects')` — oraz `useProject.ts` — `apiGet<Project>(\`/projects/${id}\`)` — każdy z własnym stanem `loading`/`error`.)*

**`client/db.json`** (fragment)
```json
{
  "projects": [
    { "id": "p1", "name": "Strona firmowa", "description": "Nowa strona marketingowa firmy." },
    { "id": "p2", "name": "Aplikacja mobilna", "description": "MVP aplikacji do zamawiania jedzenia." }
  ],
  "tasks": [
    { "id": "1", "projectId": "p1", "title": "Skonfigurować repozytorium", "description": "...", "status": "DONE", "priority": "MEDIUM" }
  ]
}
```

**Komendy:**
```bash
npm install -D json-server@0.17.4 --prefix client
# dodaj do client/package.json: "mock-api": "json-server --watch db.json --port 4000"

npm run mock-api --prefix client   # terminal 1
npm run dev --prefix client        # terminal 2

npx tsc --noEmit --project client
npm run build --prefix client
git add -A && git commit -m "checkpoint 6: integracja z REST API, async/await"
git tag checkpoint-06
```

</details>

---

## Zadanie 7: Migracja do Next.js (App Router)

### Opis zadania

Przeniesiesz aplikację z Vite + React Router na Next.js z App Routerem.
To duża zmiana strukturalna: routing staje się plikowy (struktura katalogów
`app/` *jest* routingiem), a Next.js daje pierwszy, wbudowany sposób na
napisanie backendu — Route Handlery.

### Instrukcja

1. Zainstaluj `next`, usuń `vite` i `@vitejs/plugin-react`.
2. Usuń pliki specyficzne dla Vite (`vite.config.ts`, `index.html`, `main.tsx`, `App.tsx`, cały katalog `pages/`).
3. Stwórz strukturę `src/app/` z podkatalogami `login/`, `projects/[id]/`, `api/projects/[id]/`.
4. Zaktualizuj `package.json` (skrypty `next dev`/`next build`/`next start`), stwórz `next.config.js`, nowy `tsconfig.json` w wersji dla Next.js (z pluginem `next`, `jsx: "preserve"`).
5. Przenieś `index.css` do `app/globals.css`.
6. Stwórz pierwszy „backend” aplikacji: Route Handler `GET /api/projects` (zwraca mockowaną tablicę projektów) i `GET /api/projects/[id]` (jeden projekt po `id`, `404` gdy nie istnieje).
7. Stwórz `app/layout.tsx` (układ wspólny: nagłówek + opakowanie w providery), `app/page.tsx` (przekierowanie na `/projects`), `app/providers.tsx` (komponent kliencki opakowujący `UserProvider`).
8. Przepisz strony z dawnego `pages/` na konwencję App Router: `app/login/page.tsx`, `app/projects/page.tsx`, `app/projects/[id]/page.tsx`. Zamień `react-router-dom` na `next/link` (komponent `Link`) i `next/navigation` (`useRouter`, `useParams`).
9. Przepisz `ProtectedRoute`: zamiast `<Navigate>` użyj `useRouter().replace('/login')` wewnątrz `useEffect`.
10. Każdy komponent korzystający z hooków/Contextu/zdarzeń musi mieć na początku pliku dyrektywę `'use client'` (Next.js domyślnie renderuje komponenty po stronie serwera).
11. Zaktualizuj `api/client.ts`: rozróżnij dwie bazy adresów — wewnętrzne Route Handlery Next.js (`/api`, dla projektów) i zewnętrzne testowe API (`http://localhost:4000`, dla zadań — to się zmieni w następnym zadaniu).

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`client/next.config.js`**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
}

module.exports = nextConfig
```

**`client/src/app/api/projects/route.ts`**
```typescript
import { NextResponse } from 'next/server'
import { mockProjects } from './mockProjects'

export async function GET() {
  return NextResponse.json(mockProjects)
}
```

**`client/src/app/api/projects/[id]/route.ts`**
```typescript
import { NextResponse } from 'next/server'
import { mockProjects } from '../mockProjects'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const project = mockProjects.find((p) => p.id === params.id)
  if (!project) {
    return NextResponse.json({ message: 'Projekt nie istnieje' }, { status: 404 })
  }
  return NextResponse.json(project)
}
```

**`client/src/app/providers.tsx`**
```tsx
'use client'

import type { ReactNode } from 'react'
import { UserProvider } from '../context/UserContext'

export function Providers({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>
}
```

**`client/src/app/layout.tsx`**
```tsx
import type { ReactNode } from 'react'
import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'DevTrack',
  description: 'Mini-system zarządzania zadaniami projektowymi'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <Providers>
          <div className="app">
            <header className="app-header">
              <h1>DevTrack</h1>
              <p>Mini-system zarządzania zadaniami projektowymi</p>
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
```

**`client/src/app/page.tsx`**
```tsx
import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/projects')
}
```

**`client/src/components/ProtectedRoute.tsx`**
```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useUser } from '../context/UserContext'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [user, router])

  if (!user) return <p className="hint">Przekierowanie do logowania…</p>
  return <>{children}</>
}

export default ProtectedRoute
```

**`client/src/app/projects/page.tsx`** (fragment — pełna strona analogicznie do Zadania 6, tylko z `'use client'`, `next/link` i opakowaniem w `ProtectedRoute`)
```tsx
'use client'

import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useUser } from '../../context/UserContext'
import { useProjects } from '../../hooks/useProjects'

function ProjectsContent() {
  const { user, logout } = useUser()
  const { projects, loading, error } = useProjects()
  if (!user) return null

  return (
    <div>
      <div className="page-header">
        <h2>Twoje projekty</h2>
        <div>
          <span className="hint">Zalogowano jako {user.name}</span>{' '}
          <button onClick={logout}>Wyloguj</button>
        </div>
      </div>
      {loading && <p className="hint">Wczytywanie projektów…</p>}
      {error && <p className="error-state">Nie udało się wczytać projektów ({error}).</p>}
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <strong>{project.name}</strong>
              <p>{project.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <ProjectsContent />
    </ProtectedRoute>
  )
}
```

**`client/src/api/client.ts`** (rozróżnienie dwóch baz)
```typescript
const PROJECTS_API_BASE = '/api'
const TASKS_API_BASE = 'http://localhost:4000'

function resolveBase(path: string): string {
  return path.startsWith('/projects') ? PROJECTS_API_BASE : TASKS_API_BASE
}
// ... apiGet/apiPost/apiPatch używają teraz `${resolveBase(path)}${path}`
```

**Komendy:**
```bash
npm install next@14 --prefix client
npm uninstall vite @vitejs/plugin-react --prefix client

cd client
git rm vite.config.ts index.html src/main.tsx src/App.tsx src/vite-env.d.ts
git rm -r src/pages
mkdir -p "src/app/login" "src/app/projects/[id]" "src/app/api/projects/[id]"
git mv src/index.css src/app/globals.css
cd ..

npm install --prefix client
npx tsc --noEmit --project client
npm run build --prefix client
git add -A && git commit -m "checkpoint 7: migracja do Next.js App Router"
git tag checkpoint-07
```

</details>

---

## Zadanie 8: Własne REST API w Node.js i Express

### Opis zadania

Zbudujesz samodzielny, niezależny od Next.js serwer Express — pierwszy
prawdziwy backend tego projektu. Skupisz się na strukturze typowego API
(routing, walidacja danych wejściowych, centralna obsługa błędów).

### Instrukcja

1. Stwórz nowy folder `server/` (osobny projekt npm, niezależny od `client/`). Ustaw `"type": "module"` w `package.json`.
2. Zainstaluj `express`, `cors`, `zod` (walidacja) jako dependencies, oraz `typescript`, `tsx` (do uruchamiania TS bez kompilacji), typy `@types/*` jako devDependencies.
3. Stwórz `tsconfig.json` dla backendu (`module: "ESNext"`, `target: "ES2022"`, `strict: true`).
4. Zdefiniuj typy domenowe (te same co po stronie klienta: `TaskStatus`, `TaskPriority`, `Task`, `Project`).
5. Stwórz magazyn danych w pamięci procesu (tablica `Task[]`) z funkcjami: `listTasks(projectId?)`, `getTask(id)`, `createTask(input)`, `updateTask(id, changes)`, `deleteTask(id)`.
6. Stwórz schematy walidacji Zod: jeden dla tworzenia zadania (wymaga `projectId`, `title`; resztę domyślnie ustawia), jeden dla aktualizacji (wszystkie pola opcjonalne, ale wymagaj co najmniej jednego — to dobre zastosowanie `.refine()`).
7. Stwórz centralny middleware obsługi błędów: błędy walidacji Zod → `400` z listą problemów; każdy inny błąd → `500`.
8. Stwórz router zasobu `Task` z pełnym CRUD: `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`.
9. Złóż wszystko w punkcie wejścia: `cors()`, `express.json()`, endpoint `/health`, montaż routera pod `/tasks`, middleware błędów na końcu, `app.listen`.
10. Zaktualizuj klienta: usuń `db.json` i `json-server` — `TASKS_API_BASE` ma teraz wskazywać na Twój własny serwer (ten sam port 4000, więc kod hooków się nie zmienia).
11. Przetestuj ręcznie przez `curl` (albo Postman/Insomnia) każdy endpoint, łącznie z przypadkami błędów (np. `POST` bez tytułu powinien dać `400`).

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`server/package.json`**
```json
{
  "name": "devtrack-server",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.14.15",
    "tsx": "^4.16.5",
    "typescript": "^5.5.4"
  }
}
```

**`server/src/types/index.ts`**
```typescript
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}
```

**`server/src/store/tasksStore.ts`**
```typescript
import { randomUUID } from 'node:crypto'
import type { Task } from '../types/index.js'

let tasks: Task[] = [
  { id: '1', projectId: 'p1', title: 'Skonfigurować repozytorium', description: '...', status: 'DONE', priority: 'MEDIUM' }
]

export function listTasks(projectId?: string): Task[] {
  if (!projectId) return tasks
  return tasks.filter((t) => t.projectId === projectId)
}

export function getTask(id: string): Task | undefined {
  return tasks.find((t) => t.id === id)
}

export function createTask(input: Omit<Task, 'id'>): Task {
  const task: Task = { id: randomUUID(), ...input }
  tasks.push(task)
  return task
}

export function updateTask(id: string, changes: Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority'>>): Task | undefined {
  const task = tasks.find((t) => t.id === id)
  if (!task) return undefined
  Object.assign(task, changes)
  return task
}

export function deleteTask(id: string): boolean {
  const before = tasks.length
  tasks = tasks.filter((t) => t.id !== id)
  return tasks.length < before
}
```

**`server/src/validation/taskSchemas.ts`**
```typescript
import { z } from 'zod'

export const taskStatusSchema = z.enum(['TODO', 'IN_PROGRESS', 'DONE'])
export const taskPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH'])

export const createTaskSchema = z.object({
  projectId: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).default(''),
  status: taskStatusSchema.default('TODO'),
  priority: taskPrioritySchema.default('MEDIUM')
})

export const updateTaskSchema = z
  .object({
    title: z.string().min(1).max(200).optional(),
    description: z.string().max(2000).optional(),
    status: taskStatusSchema.optional(),
    priority: taskPrioritySchema.optional()
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Podaj przynajmniej jedno pole do aktualizacji'
  })
```

**`server/src/middleware/errorHandler.ts`**
```typescript
import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Błąd walidacji danych wejściowych',
      issues: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message }))
    })
    return
  }
  console.error(err)
  res.status(500).json({ message: 'Wewnętrzny błąd serwera' })
}
```

**`server/src/routes/tasks.ts`**
```typescript
import { Router } from 'express'
import { createTask, deleteTask, getTask, listTasks, updateTask } from '../store/tasksStore.js'
import { createTaskSchema, updateTaskSchema } from '../validation/taskSchemas.js'

export const tasksRouter = Router()

tasksRouter.get('/', (req, res) => {
  const projectId = typeof req.query.projectId === 'string' ? req.query.projectId : undefined
  res.json(listTasks(projectId))
})

tasksRouter.get('/:id', (req, res) => {
  const task = getTask(req.params.id)
  if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
  res.json(task)
})

tasksRouter.post('/', (req, res, next) => {
  try {
    const input = createTaskSchema.parse(req.body)
    res.status(201).json(createTask(input))
  } catch (err) {
    next(err)
  }
})

tasksRouter.patch('/:id', (req, res, next) => {
  try {
    const changes = updateTaskSchema.parse(req.body)
    const task = updateTask(req.params.id, changes)
    if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
    res.json(task)
  } catch (err) {
    next(err)
  }
})

tasksRouter.delete('/:id', (req, res) => {
  if (!deleteTask(req.params.id)) return res.status(404).json({ message: 'Zadanie nie istnieje' })
  res.status(204).send()
})
```

**`server/src/index.ts`**
```typescript
import cors from 'cors'
import express from 'express'
import { tasksRouter } from './routes/tasks.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT ?? 4000

app.use(cors())
app.use(express.json())
app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/tasks', tasksRouter)
app.use(errorHandler)

app.listen(PORT, () => console.log(`DevTrack API działa na http://localhost:${PORT}`))
```

**Komendy:**
```bash
mkdir -p server/src/{routes,store,validation,middleware,types}
npm install cors express zod --prefix server
npm install -D @types/cors @types/express @types/node tsx typescript --prefix server

npm run build --prefix server
npm run dev --prefix server   # curl http://localhost:4000/tasks

git add -A && git commit -m "checkpoint 8: wlasne REST API Express"
git tag checkpoint-08
```

</details>

---

## Zadanie 9: Uwierzytelnianie i autoryzacja JWT

### Opis zadania

Zamienisz mockowe „logowanie samą nazwą” na prawdziwy mechanizm: rejestracja
z hashowanym hasłem, logowanie zwracające token JWT, i middleware chroniący
endpointy, do których powinni mieć dostęp tylko zalogowani użytkownicy.

### Instrukcja

1. Zainstaluj `bcryptjs` (hashowanie haseł) i `jsonwebtoken` (tokeny JWT) w `server/`.
2. Stwórz magazyn użytkowników w pamięci (`id`, `email`, `name`, `passwordHash`) z funkcjami `findUserByEmail`, `createUser`.
3. Stwórz moduł JWT: funkcję podpisującą token (`signToken`, z payloadem `sub`/`email`/`name`) i weryfikującą (`verifyToken`). Sekret czytaj ze zmiennej środowiskowej z wartością domyślną na potrzeby developmentu.
4. Stwórz schematy walidacji rejestracji (e-mail, imię, hasło min. 8 znaków) i logowania.
5. Stwórz router `auth`: `POST /register` (sprawdza duplikat e-maila → `409`, hashuje hasło, zwraca token+usera), `POST /login` (porównuje hash hasła, `401` przy niezgodności).
6. Stwórz middleware `requireAuth`: czyta nagłówek `Authorization: Bearer <token>`, weryfikuje go, ustawia `req.user`; brak/błędny token → `401`.
7. Zamontuj `requireAuth` jako middleware na **całym** routerze `tasks` (`tasksRouter.use(requireAuth)`).
8. Po stronie klienta: zmień typ `User` na `{ id, email, name }`, dodaj `AuthResponse`. Przepisz `UserContext`: `login`/`register` jako funkcje `async` wołające odpowiednie endpointy, zapisujące token w `localStorage`; przy starcie aplikacji odtwórz sesję z `localStorage` (z flagą `loading`, żeby `ProtectedRoute` nie przekierowywał, zanim sesja się odtworzy).
9. W kliencie dodaj do każdego żądania (`apiGet`/`apiPost`/`apiPatch`) nagłówek `Authorization`, jeśli token istnieje.
10. Przepisz stronę logowania na formularz e-mail/hasło, z przełącznikiem logowanie ↔ rejestracja.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`server/src/auth/jwt.ts`**
```typescript
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me'

export interface JwtPayload {
  sub: string
  email: string
  name: string
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}
```

**`server/src/middleware/requireAuth.ts`**
```typescript
import type { NextFunction, Request, Response } from 'express'
import { verifyToken, type JwtPayload } from '../auth/jwt.js'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' })
  }
  try {
    req.user = verifyToken(header.slice('Bearer '.length))
    next()
  } catch {
    return res.status(401).json({ message: 'Token jest nieprawidłowy lub wygasł' })
  }
}
```

**`server/src/routes/auth.ts`**
```typescript
import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { createUser, findUserByEmail } from '../store/usersStore.js'
import { loginSchema, registerSchema } from '../validation/authSchemas.js'
import { signToken } from '../auth/jwt.js'

export const authRouter = Router()

authRouter.post('/register', async (req, res, next) => {
  try {
    const { email, name, password } = registerSchema.parse(req.body)
    if (findUserByEmail(email)) {
      return res.status(409).json({ message: 'Użytkownik z tym adresem e-mail już istnieje' })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = createUser({ email, name, passwordHash })
    const token = signToken({ sub: user.id, email: user.email, name: user.name })
    res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    next(err)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = findUserByEmail(email)
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Nieprawidłowy e-mail lub hasło' })
    }
    const token = signToken({ sub: user.id, email: user.email, name: user.name })
    res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    next(err)
  }
})
```

**`client/src/context/UserContext.tsx`** (kluczowy fragment)
```tsx
'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiPost, clearToken, getToken, setToken } from '../api/client'
import type { AuthResponse, User } from '../types'

const USER_STORAGE_KEY = 'devtrack_user'

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY)
    if (token && storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  function persistSession(auth: AuthResponse) {
    setToken(auth.token)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(auth.user))
    setUser(auth.user)
  }

  async function login(email: string, password: string) {
    persistSession(await apiPost<AuthResponse>('/auth/login', { email, password }, false))
  }

  async function register(email: string, name: string, password: string) {
    persistSession(await apiPost<AuthResponse>('/auth/register', { email, name, password }, false))
  }

  function logout() {
    clearToken()
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  // ... Provider z { user, loading, login, register, logout }
}
```

**Komendy:**
```bash
npm install bcryptjs jsonwebtoken --prefix server
npm install -D @types/bcryptjs @types/jsonwebtoken --prefix server

npm run dev --prefix server
# zarejestruj testowego usera, zaloguj sie, sprawdz że GET /tasks bez tokenu = 401

npm run build --prefix server
npx tsc --noEmit --project client && npm run build --prefix client
git add -A && git commit -m "checkpoint 9: JWT auth"
git tag checkpoint-09
```

</details>

---

## Zadanie 10: PostgreSQL i Prisma ORM

### Opis zadania

Magazyny danych w pamięci procesu (które tracą dane po każdym restarcie)
zamienisz na prawdziwą bazę relacyjną — PostgreSQL — obsługiwaną przez
Prisma ORM. To największy skok jakościowy w projekcie: dane wreszcie
przetrwają restart serwera, a relacje (projekt → zadania → komentarze)
będą wymuszone na poziomie bazy danych.

### Instrukcja

1. Zainstaluj `@prisma/client` (dependency) i `prisma` (CLI, devDependency).
2. Zaprojektuj `schema.prisma`: modele `User`, `Project`, `Task` (z enumami `TaskStatus`, `TaskPriority`), `Comment`. Zastanów się nad relacjami: kto jest właścicielem projektu? Kto jest autorem komentarza? Co się dzieje z zadaniami, gdy usuniesz projekt (kaskadowe usuwanie)?
3. Skonfiguruj `DATABASE_URL` w `.env` (jeśli nie masz lokalnego PostgreSQL, odpal go w Dockerze jednorazowym poleceniem `docker run postgres:16`).
4. Wygeneruj klienta Prisma i pierwszą migrację.
5. Napisz skrypt seedujący: tworzy jednego użytkownika demo, dwa projekty, kilka zadań.
6. Zastąp dotychczasowe magazyny w pamięci (`usersStore`, `tasksStore`) warstwą **serwisów** — funkcje o tych samych nazwach/sygnaturach co poprzednio, ale wołające `prisma.<model>.findMany/create/update/delete` zamiast operacji na tablicy.
7. Dodaj router `projects`: lista i szczegóły projektu **filtrowane po właścicielu** (na podstawie `req.user.sub` z tokenu), tworzenie nowego projektu.
8. Dodaj do routera zadań endpointy komentarzy (`GET`/`POST /tasks/:id/comments`).
9. Po stronie klienta: usuń mockowe Route Handlery Next.js z Zadania 7 — od teraz **cały** backend to Twój serwer Express+Prisma, jedna baza adresu API.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`server/prisma/schema.prisma`**
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           String    @id @default(uuid())
  email        String    @unique
  name         String
  passwordHash String
  projects     Project[]
  comments     Comment[]
  createdAt    DateTime  @default(now())
}

model Project {
  id          String   @id @default(uuid())
  name        String
  description String   @default("")
  owner       User     @relation(fields: [ownerId], references: [id])
  ownerId     String
  tasks       Task[]
  createdAt   DateTime @default(now())
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  DONE
}

enum TaskPriority {
  LOW
  MEDIUM
  HIGH
}

model Task {
  id          String       @id @default(uuid())
  project     Project      @relation(fields: [projectId], references: [id], onDelete: Cascade)
  projectId   String
  title       String
  description String       @default("")
  status      TaskStatus   @default(TODO)
  priority    TaskPriority @default(MEDIUM)
  comments    Comment[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Comment {
  id        String   @id @default(uuid())
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  taskId    String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  content   String
  createdAt DateTime @default(now())
}
```

**`server/src/db/client.ts`**
```typescript
import { PrismaClient } from '@prisma/client'

declare global {
  var prismaGlobal: PrismaClient | undefined
}

export const prisma = globalThis.prismaGlobal ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
```

**`server/src/services/tasksService.ts`**
```typescript
import { prisma } from '../db/client.js'
import type { Prisma, TaskPriority, TaskStatus } from '@prisma/client'

export function listTasks(projectId?: string) {
  return prisma.task.findMany({ where: projectId ? { projectId } : undefined, orderBy: { createdAt: 'asc' } })
}

export function getTask(id: string) {
  return prisma.task.findUnique({ where: { id } })
}

export function createTask(input: { projectId: string; title: string; description?: string; status?: TaskStatus; priority?: TaskPriority }) {
  return prisma.task.create({
    data: {
      projectId: input.projectId,
      title: input.title,
      description: input.description ?? '',
      status: input.status ?? 'TODO',
      priority: input.priority ?? 'MEDIUM'
    }
  })
}

export async function updateTask(id: string, changes: Prisma.TaskUpdateInput) {
  try {
    return await prisma.task.update({ where: { id }, data: changes })
  } catch {
    return null
  }
}
```

**`server/src/routes/projects.ts`**
```typescript
import { Router } from 'express'
import { z } from 'zod'
import { createProject, getProjectForUser, listProjectsForUser } from '../services/projectsService.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const projectsRouter = Router()
projectsRouter.use(requireAuth)

const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional()
})

projectsRouter.get('/', async (req, res) => {
  res.json(await listProjectsForUser(req.user!.sub))
})

projectsRouter.get('/:id', async (req, res) => {
  const project = await getProjectForUser(req.params.id, req.user!.sub)
  if (!project) return res.status(404).json({ message: 'Projekt nie istnieje' })
  res.json(project)
})

projectsRouter.post('/', async (req, res, next) => {
  try {
    const input = createProjectSchema.parse(req.body)
    res.status(201).json(await createProject({ ...input, ownerId: req.user!.sub }))
  } catch (err) {
    next(err)
  }
})
```

**Komendy:**
```bash
npm install @prisma/client --prefix server
npm install -D prisma --prefix server

# .env w server/: DATABASE_URL="postgresql://devtrack:devtrack@localhost:5432/devtrack"
docker run --name devtrack-pg -e POSTGRES_USER=devtrack -e POSTGRES_PASSWORD=devtrack -e POSTGRES_DB=devtrack -p 5432:5432 -d postgres:16

cd server
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed   # po dodaniu prisma/seed.ts i wpisu "prisma": {"seed": "tsx prisma/seed.ts"} w package.json
cd ..

npx tsc --noEmit --project client && npm run build --prefix client
git add -A && git commit -m "checkpoint 10: PostgreSQL + Prisma"
git tag checkpoint-10
```

**Uwaga:** bez `npx prisma generate` TypeScript w `server/` będzie zgłaszał błędy „Module has no exported member 'PrismaClient'" — to nie błąd kodu, tylko brakujący krok generowania typów na podstawie schematu.

</details>

---

## Zadanie 11: Testy — Jest i React Testing Library

### Opis zadania

Napiszesz pierwsze testy automatyczne — po stronie klienta (komponenty,
hooki) i serwera (walidacja, JWT, routery). Dla testów serwera zastosujesz
ważną technikę: mockowanie warstwy serwisów, żeby testować logikę API **bez**
potrzeby prawdziwej bazy danych.

### Instrukcja

**Klient:**
1. Zainstaluj `jest`, `jest-environment-jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`.
2. Skonfiguruj Jest przez wbudowany helper `next/jest`.
3. Napisz testy komponentu `TaskItem`: renderowanie treści, wywołanie `onClick` z poprawnymi argumentami po kliknięciu, brak klasy „klikalny” bez przekazanego handlera.
4. Napisz testy `TaskList`: renderowanie listy i empty state.
5. Napisz testy `TaskForm`: wypełnienie i wysłanie formularza wywołuje `onAddTask` z poprawnym obiektem i czyści pola; pusty tytuł nie wywołuje callbacku.
6. Napisz test generycznego hooka `useEntityList` (`add`/`update`/`remove`) za pomocą `renderHook`.

**Serwer:**
1. Zainstaluj `jest`, `ts-jest`, `supertest`, odpowiednie typy.
2. Skonfiguruj `ts-jest` z osobnym `tsconfig` (kompilacja do CommonJS na potrzeby testów) — zwróć uwagę, że plik konfiguracyjny Jest musi mieć rozszerzenie `.cjs`, bo główny `package.json` ma `"type": "module"`.
3. Wydziel konfigurację Express (`app.ts`, bez `app.listen`) z punktu startowego (`index.ts`, tylko `import { app }` + `listen`) — to pozwala `supertest` zaimportować `app` bez faktycznego startowania serwera.
4. Napisz testy walidacji Zod (przypadki poprawne i błędne) i modułu JWT (`signToken`/`verifyToken`).
5. Napisz test middleware błędów (poprawna obsługa `ZodError` i błędu generycznego).
6. Napisz test routera zadań przez `supertest`, **mockując wszystkie serwisy**, które transitywnie importuje `app.ts` (inaczej próba zaimportowania `app` pociągnie za sobą prawdziwego klienta Prisma).

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`client/jest.config.js`**
```js
const nextJest = require('next/jest')
const createJestConfig = nextJest({ dir: './' })

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  modulePathIgnorePatterns: ['<rootDir>/.next/']
}

module.exports = createJestConfig(customJestConfig)
```

**`client/src/components/__tests__/TaskItem.test.tsx`**
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../TaskItem'
import type { Task } from '../../types'

const task: Task = { id: 't1', projectId: 'p1', title: 'Napisać testy', description: '...', status: 'TODO', priority: 'HIGH' }

describe('TaskItem', () => {
  it('wywołuje onClick z id zadania i aktualnym statusem po kliknięciu', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()
    render(<TaskItem task={task} onClick={onClick} />)
    await user.click(screen.getByText('Napisać testy'))
    expect(onClick).toHaveBeenCalledWith('t1', 'TODO')
  })
})
```

**`server/jest.config.cjs`**
```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/../tsconfig.jest.json' }] }
}
```

**`server/tsconfig.jest.json`**
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": { "module": "CommonJS", "moduleResolution": "node", "isolatedModules": true }
}
```

**`server/src/app.ts`** (wydzielone z `index.ts`)
```typescript
import cors from 'cors'
import express from 'express'
import { tasksRouter } from './routes/tasks.js'
import { authRouter } from './routes/auth.js'
import { projectsRouter } from './routes/projects.js'
import { errorHandler } from './middleware/errorHandler.js'

export const app = express()
app.use(cors())
app.use(express.json())
app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/auth', authRouter)
app.use('/projects', projectsRouter)
app.use('/tasks', tasksRouter)
app.use(errorHandler)
```

**`server/src/routes/__tests__/tasks.test.ts`** (fragment)
```typescript
import request from 'supertest'

jest.mock('../../services/tasksService.js', () => ({
  listTasks: jest.fn(), getTask: jest.fn(), createTask: jest.fn(), updateTask: jest.fn(), deleteTask: jest.fn()
}))
jest.mock('../../services/usersService.js', () => ({ findUserByEmail: jest.fn(), createUser: jest.fn() }))
jest.mock('../../services/projectsService.js', () => ({ listProjectsForUser: jest.fn(), getProjectForUser: jest.fn(), createProject: jest.fn() }))
jest.mock('../../middleware/requireAuth.js', () => ({
  requireAuth: (req: any, _res: any, next: any) => {
    req.user = { sub: 'test-user-id', email: 'test@example.com', name: 'Test' }
    next()
  }
}))

import { app } from '../../app'
import * as tasksService from '../../services/tasksService.js'

describe('GET /tasks', () => {
  it('zwraca listę zadań z serwisu', async () => {
    (tasksService.listTasks as jest.Mock).mockResolvedValue([{ id: '1', title: 'Zadanie A' }])
    const res = await request(app).get('/tasks?projectId=p1')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ id: '1', title: 'Zadanie A' }])
  })
})
```

**Komendy:**
```bash
npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest --prefix client
npm install -D jest ts-jest @types/jest supertest @types/supertest --prefix server

npm test --prefix client   # 11 testów
npm test --prefix server   # 16 testów
git add -A && git commit -m "checkpoint 11: testy Jest + RTL + supertest"
git tag checkpoint-11
```

</details>

---

## Zadanie 12: Docker i konteneryzacja

### Opis zadania

Spakujesz całą aplikację (bazę danych, backend, frontend) tak, żeby odpalała
się jedną komendą, niezależnie od tego, co masz zainstalowane lokalnie. To
ćwiczenie z multi-stage Dockerfile (mniejsze, bezpieczniejsze obrazy
produkcyjne) oraz z `docker-compose` (orkiestracja kilku kontenerów naraz).

### Instrukcja

1. W `next.config.js` dodaj `output: 'standalone'` — Next.js spakuje wtedy tylko niezbędny kod i zależności do działania serwera produkcyjnego (mniejszy obraz).
2. Stwórz `Dockerfile` dla `client/` w trzech etapach: instalacja zależności → build (**uwaga**: zmienne `NEXT_PUBLIC_*` Next.js zaszywa w kodzie już na etapie builda, więc musisz przekazać je jako `ARG`, nie jako zwykłą zmienną środowiskową kontenera w runtime) → obraz produkcyjny kopiujący tylko `.next/standalone`.
3. Stwórz `Dockerfile` dla `server/` w trzech etapach: instalacja → build (z `npx prisma generate` w tym kroku!) → obraz produkcyjny z `npm ci --omit=dev` (uwaga: jeśli chcesz uruchamiać migracje przy starcie kontenera, pakiet `prisma` musi być w `dependencies`, nie `devDependencies` — inaczej zniknie po `--omit=dev`).
4. Napisz skrypt startowy (`docker-entrypoint.sh`) dla serwera: najpierw `npx prisma migrate deploy`, potem start aplikacji.
5. Stwórz `docker-compose.yml` w katalogu głównym z trzema serwisami: `db` (Postgres, z healthcheckiem), `server` (zależny od zdrowej bazy), `client` (zależny od serwera, z `build.args` ustawiającym `NEXT_PUBLIC_API_URL`).
6. Sprawdź, że `docker compose up --build` odpala całość, a aplikacja działa identycznie jak przy lokalnym odpalaniu `npm run dev`.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`server/Dockerfile`**
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
EXPOSE 4000
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "dist/index.js"]
```

**`server/docker-entrypoint.sh`**
```sh
#!/bin/sh
set -e
echo "Stosowanie migracji Prisma..."
npx prisma migrate deploy
echo "Start serwera..."
exec "$@"
```

**`client/Dockerfile`**
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**`docker-compose.yml`**
```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: devtrack
      POSTGRES_PASSWORD: devtrack
      POSTGRES_DB: devtrack
    ports: ['5432:5432']
    volumes: ['devtrack_pg_data:/var/lib/postgresql/data']
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U devtrack']
      interval: 5s
      timeout: 5s
      retries: 10

  server:
    build: ./server
    depends_on:
      db:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://devtrack:devtrack@db:5432/devtrack
      JWT_SECRET: ${JWT_SECRET:-dev-secret-change-me}
      PORT: 4000
    ports: ['4000:4000']

  client:
    build:
      context: ./client
      args:
        NEXT_PUBLIC_API_URL: http://localhost:4000
    depends_on: [server]
    ports: ['3000:3000']

volumes:
  devtrack_pg_data:
```

**Komendy:**
```bash
cp .env.example .env
docker compose up --build
docker compose exec server npm run db:seed

git add -A && git commit -m "checkpoint 12: Docker + docker-compose"
git tag checkpoint-12
```

</details>

---

## Zadanie 13: CI/CD — GitHub Actions

### Opis zadania

Skonfigurujesz automatyczny pipeline, który przy każdym push/PR sprawdza,
czy kod się kompiluje, przechodzi testy i buduje — zarówno dla frontendu,
backendu, jak i obrazów Docker. To pierwszy krok do tego, żeby błędy
wykrywać automatycznie, zanim trafią na produkcję.

### Instrukcja

1. Stwórz `.github/workflows/ci.yml`, uruchamiany na `push`/`pull_request` do `main`.
2. Zdefiniuj job `server`: checkout → setup Node 20 (z cache npm) → `npm ci` → **`npx prisma generate`** (bez tego TypeScript nie zobaczy typów modeli!) → `npm run typecheck` → `npm test` (Twoje testy z Zadania 11 powinny przejść **bez** bazy danych, bo mockują serwisy) → `npm run build`.
3. Zdefiniuj analogiczny job `client`: `npm ci` → `typecheck` → `test` → `build`.
4. Zdefiniuj job `docker-build` (zależny od poprzednich dwóch przez `needs`): `docker compose build` — sprawdza, że obrazy z Zadania 12 się budują, bez ich publikowania.
5. (Opcjonalnie) Zdefiniuj job `deploy`, domyślnie wyłączony warunkiem `if` (np. `&& false`), wdrażający frontend na Vercel i backend przez webhook Render — żeby nie failował na repo bez skonfigurowanych sekretów. Włączysz go po dodaniu sekretów `VERCEL_TOKEN`/`RENDER_DEPLOY_HOOK_URL` w ustawieniach repozytorium.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`.github/workflows/ci.yml`**
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  server:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: server
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm', cache-dependency-path: server/package-lock.json }
      - run: npm ci
      - run: npx prisma generate
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  client:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: client
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm', cache-dependency-path: client/package-lock.json }
      - run: npm ci
      - run: npm run typecheck
      - run: npm test
      - run: npm run build

  docker-build:
    runs-on: ubuntu-latest
    needs: [server, client]
    steps:
      - uses: actions/checkout@v4
      - run: docker compose build

  deploy:
    runs-on: ubuntu-latest
    needs: [server, client, docker-build]
    if: github.ref == 'refs/heads/main' && false # odblokuj po skonfigurowaniu sekretow
    steps:
      - uses: actions/checkout@v4
      - run: npx vercel --token=$VERCEL_TOKEN --prod --cwd client --yes
        env: { VERCEL_TOKEN: '${{ secrets.VERCEL_TOKEN }}' }
      - run: curl -X POST "$RENDER_DEPLOY_HOOK_URL"
        env: { RENDER_DEPLOY_HOOK_URL: '${{ secrets.RENDER_DEPLOY_HOOK_URL }}' }
```

**Komendy:**
```bash
git add -A && git commit -m "checkpoint 13: CI/CD GitHub Actions"
git tag checkpoint-13
git push origin main --tags
```

</details>

---

## Zadanie 14: Hurtownie i jeziora danych (wprowadzenie)

### Opis zadania

Dodasz prosty log zdarzeń (kto co zrobił i kiedy) i zbudujesz na jego
podstawie panel statystyk. To też pretekst do dyskusji teoretycznej: czym
różni się baza, z której właśnie korzysta aplikacja (OLTP), od hurtowni
danych (OLAP) i „jeziora danych” (surowe zdarzenia w plikach) — bez pełnej
implementacji żadnego z tych dwóch ostatnich, tylko jako wprowadzenie.

### Instrukcja

1. Dodaj do `schema.prisma` model `ActivityLog` (relacja do `Task`, pola `action`, `payload` typu JSON) i indeksy (`@@index`) na `Task.projectId` i `Task.status` — przydadzą się do zapytań agregujących.
2. Wygeneruj nową migrację.
3. Stwórz serwis logujący zdarzenia (`logActivity`) i agregujący statystyki: liczbę zadań w każdym statusie dla projektu (`prisma.task.groupBy`) oraz listę ostatnich zdarzeń.
4. W serwisie zadań: przy tworzeniu zadania zaloguj zdarzenie `TASK_CREATED`; przy zmianie statusu — `STATUS_CHANGED` (z informacją, jaki był stary i nowy status).
5. Dodaj endpoint `GET /projects/:id/stats` zwracający te dwie informacje naraz.
6. Po stronie klienta: hook pobierający statystyki, komponent wyświetlający liczniki per status + listę ostatniej aktywności, podłączony na stronie szczegółów projektu (z odświeżaniem po każdej zmianie zadania).
7. **Ćwiczenie dyskusyjne (bez kodu):** napisz krótki skrypt, który eksportuje cały `ActivityLog` do pliku JSON na dysku — to bardzo uproszczona ilustracja idei „data lake”. Zastanów się: jak wyglądałby tu krok ETL/ELT budujący zagregowane tabele w hurtowni? Dlaczego analitycy nie powinni odpytywać bazy produkcyjnej wprost?

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**Dopisz do `schema.prisma`:**
```prisma
model Task {
  // ...pola jak wcześniej...
  activityLogs ActivityLog[]

  @@index([projectId])
  @@index([status])
}

model ActivityLog {
  id        String   @id @default(uuid())
  task      Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  taskId    String
  action    String
  payload   Json?
  createdAt DateTime @default(now())

  @@index([taskId])
  @@index([createdAt])
}
```

**`server/src/services/activityService.ts`**
```typescript
import { prisma } from '../db/client.js'
import type { Prisma } from '@prisma/client'

export function logActivity(taskId: string, action: string, payload?: Prisma.InputJsonValue) {
  return prisma.activityLog.create({ data: { taskId, action, payload } })
}

export async function getStatusCounts(projectId: string) {
  const grouped = await prisma.task.groupBy({ by: ['status'], where: { projectId }, _count: { _all: true } })
  const counts: Record<string, number> = { TODO: 0, IN_PROGRESS: 0, DONE: 0 }
  for (const row of grouped) counts[row.status] = row._count._all
  return counts
}

export function getRecentActivity(projectId: string, limit = 10) {
  return prisma.activityLog.findMany({
    where: { task: { projectId } },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { task: { select: { id: true, title: true } } }
  })
}
```

**`server/src/routes/projects.ts`** (dodatkowy endpoint)
```typescript
projectsRouter.get('/:id/stats', async (req, res) => {
  const project = await getProjectForUser(req.params.id, req.user!.sub)
  if (!project) return res.status(404).json({ message: 'Projekt nie istnieje' })

  const [statusCounts, recentActivity] = await Promise.all([
    getStatusCounts(project.id),
    getRecentActivity(project.id)
  ])
  res.json({ statusCounts, recentActivity })
})
```

**`server/scripts/export-activity-lake.ts`** (ćwiczenie dyskusyjne)
```typescript
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const logs = await prisma.activityLog.findMany({
    include: { task: { select: { id: true, projectId: true, title: true } } },
    orderBy: { createdAt: 'asc' }
  })
  const outDir = path.resolve('data-lake')
  await mkdir(outDir, { recursive: true })
  const filePath = path.join(outDir, `activity-${new Date().toISOString().slice(0, 10)}.json`)
  await writeFile(filePath, JSON.stringify(logs, null, 2), 'utf-8')
  console.log(`Wyeksportowano ${logs.length} zdarzeń do ${filePath}`)
}

main().finally(() => prisma.$disconnect())
```

**Komendy:**
```bash
cd server && npx prisma migrate dev --name add_activity_log && cd ..
git add -A && git commit -m "checkpoint 14: ActivityLog, panel statystyk"
git tag checkpoint-14
```

</details>

---

## Zadanie 15: Integracja z zewnętrznym API AI

### Opis zadania

Ostatni etap: podłączysz aplikację do zewnętrznego dostawcy AI (Anthropic),
dodając dwie funkcje — automatyczne podsumowanie opisu zadania i prostego
asystenta, który odpowiada na pytania o stan projektu na podstawie realnych
danych z bazy. Najważniejsza lekcja tego zadania jest **architektoniczna**:
gdzie powinien żyć klucz API i jak nie pozwolić modelowi „zmyślać”.

### Instrukcja

1. Zainstaluj SDK dostawcy AI w `server/` (klucz API **zawsze** po stronie serwera — frontend nigdy nie powinien znać klucza API do zewnętrznego dostawcy).
2. Stwórz serwis AI z dwiema funkcjami:
   - `summarizeText(text)` — wysyła tekst do modelu z krótkim promptem systemowym proszącym o streszczenie w 1–2 zdaniach.
   - `answerProjectQuestion(question, context)` — wysyła pytanie razem z listą zadań projektu jako kontekstem, z promptem systemowym **wymuszającym**, żeby model odpowiadał wyłącznie na podstawie przekazanych danych (a nie ogólnej wiedzy).
3. Zdefiniuj specjalny typ błędu na wypadek braku skonfigurowanego klucza API, i obsłuż go w middleware błędów jako `503` z czytelnym komunikatem (zamiast niezrozumiałego crasha).
4. Dodaj endpoint `POST /tasks/:id/summarize` (znajduje zadanie, woła `summarizeText` na jego opisie).
5. Dodaj endpoint `POST /projects/:id/ask` (sprawdza własność projektu, pobiera jego zadania, woła `answerProjectQuestion`).
6. Po stronie klienta: dodaj przycisk „Podsumuj AI” na każdym zadaniu — **uwaga**, element zadania ma już własny `onClick` do zmiany statusu, więc musisz zatrzymać propagację zdarzenia (`event.stopPropagation()`), żeby kliknięcie przycisku nie zmieniało jednocześnie statusu.
7. Stwórz komponent „Asystent projektu”: pole tekstowe z pytaniem, przycisk, wyświetlenie odpowiedzi. Podłącz go na stronie szczegółów projektu.
8. Sprawdź działanie obu funkcji w przeglądarce po skonfigurowaniu klucza API.

<details>
<summary>📄 Pokaż gotowy kod (rozwiązanie)</summary>

**`server/src/services/aiService.ts`**
```typescript
import Anthropic from '@anthropic-ai/sdk'

const apiKey = process.env.ANTHROPIC_API_KEY
const client = apiKey ? new Anthropic({ apiKey }) : null
const MODEL = 'claude-haiku-4-5-20251001'

export class AiNotConfiguredError extends Error {
  constructor() {
    super('Integracja z AI nie jest skonfigurowana — ustaw ANTHROPIC_API_KEY w server/.env')
  }
}

function requireClient(): Anthropic {
  if (!client) throw new AiNotConfiguredError()
  return client
}

export async function summarizeText(text: string): Promise<string> {
  if (!text.trim()) return 'Brak opisu do podsumowania.'
  const response = await requireClient().messages.create({
    model: MODEL,
    max_tokens: 200,
    system: 'Jesteś asystentem w systemie do zarządzania zadaniami. Podsumuj opis zadania w maksymalnie 2 krótkich zdaniach, po polsku, bez wstępów.',
    messages: [{ role: 'user', content: text }]
  })
  const textBlock = response.content.find((b) => b.type === 'text')
  return textBlock?.type === 'text' ? textBlock.text.trim() : 'Nie udało się wygenerować podsumowania.'
}

export async function answerProjectQuestion(
  question: string,
  context: { projectName: string; tasks: { title: string; status: string; priority: string }[] }
): Promise<string> {
  const tasksDescription = context.tasks
    .map((t) => `- "${t.title}" — status: ${t.status}, priorytet: ${t.priority}`)
    .join('\n')

  const response = await requireClient().messages.create({
    model: MODEL,
    max_tokens: 300,
    system: 'Jesteś asystentem projektowym. Odpowiadaj WYŁĄCZNIE na podstawie podanych danych o projekcie i jego zadaniach. Jeśli odpowiedzi nie da się ustalić z tych danych, powiedz to wprost. Odpowiadaj krótko, po polsku.',
    messages: [{ role: 'user', content: `Projekt: ${context.projectName}\n\nZadania:\n${tasksDescription}\n\nPytanie: ${question}` }]
  })
  const textBlock = response.content.find((b) => b.type === 'text')
  return textBlock?.type === 'text' ? textBlock.text.trim() : 'Nie udało się wygenerować odpowiedzi.'
}
```

**`server/src/routes/tasks.ts`** (dodatkowy endpoint)
```typescript
tasksRouter.post('/:id/summarize', async (req, res, next) => {
  try {
    const task = await getTask(req.params.id)
    if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
    res.json({ summary: await summarizeText(task.description) })
  } catch (err) {
    next(err)
  }
})
```

**`client/src/components/TaskItem.tsx`** (fragment z przyciskiem AI)
```tsx
async function handleSummarize(event: MouseEvent) {
  event.stopPropagation() // <li> ma już onClick do zmiany statusu!
  setSummarizing(true)
  try {
    const result = await apiPost<{ summary: string }>(`/tasks/${task.id}/summarize`, {})
    setSummary(result.summary)
  } catch (err) {
    setSummaryError(err instanceof Error ? err.message : 'Błąd podsumowania')
  } finally {
    setSummarizing(false)
  }
}
```

**`client/src/components/AiAssistant.tsx`**
```tsx
'use client'

import { useState, type FormEvent } from 'react'
import { apiPost, ApiError } from '../api/client'

function AiAssistant({ projectId }: { projectId: string }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!question.trim()) return
    try {
      const result = await apiPost<{ answer: string }>(`/projects/${projectId}/ask`, { question })
      setAnswer(result.answer)
      setError(null)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Coś poszło nie tak')
    }
  }

  return (
    <div className="ai-assistant">
      <h3>🤖 Asystent projektu</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Twoje pytanie…" />
        <button type="submit">Zapytaj</button>
      </form>
      {answer && <p className="ai-summary">{answer}</p>}
      {error && <p className="error-state">{error}</p>}
    </div>
  )
}

export default AiAssistant
```

**Komendy:**
```bash
npm install @anthropic-ai/sdk --prefix server
# w server/.env: ANTHROPIC_API_KEY="sk-ant-..."

npm run dev --prefix server
npm run dev --prefix client
# zaloguj się, kliknij "Podsumuj AI" na zadaniu, zadaj pytanie asystentowi

git add -A && git commit -m "checkpoint 15: integracja z AI"
git tag checkpoint-15
```

</details>

---

## Gratulacje

Jeśli doszedłeś/aś do tego miejsca i wszystko działa — masz kompletny,
samodzielnie napisany projekt Full-Stack: React+TypeScript (od pierwszej
linijki) → Next.js → Express → PostgreSQL/Prisma → testy → kontenery →
CI/CD → dane → AI. Porównaj finalny stan z `checkpoint-15` w repo
referencyjnym, żeby się upewnić, że niczego nie przegapiłeś/aś.

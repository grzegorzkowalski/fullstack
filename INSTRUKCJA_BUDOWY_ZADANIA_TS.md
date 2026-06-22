# DevTrack — zbuduj projekt od zera

**Zasada pracy:** najpierw przeczytaj „Opis zadania” i „Instrukcję”, spróbuj
napisać kod samodzielnie, a dopiero potem kliknij **„📄 Pokaż gotowy kod”**.
Polecenia terminala (`npm install`, `git commit` itd.) są zawsze widoczne —
to nie jest „rozwiązanie”, tylko mechanika, którą i tak musisz wykonać.


---

## Zadanie 1: Szkielet projektu — Vite (szablon `react-ts`) i pierwszy commit

### Opis zadania

Na start tworzysz pusty projekt React z TypeScriptem. Korzystasz z Vite, więc większość konfiguracji dostajesz od razu. Twoim zadaniem jest uruchomić projekt, usunąć przykładowy ekran i wstawić prostą stronę startową DevTrack.

### Instrukcja

1. W katalogu głównym utwórz aplikację `client` z szablonu Vite `react-ts`.
2. Wejdź do `client`, zainstaluj zależności i uruchom aplikację lokalnie.
3. Otwórz wygenerowane pliki i sprawdź, gdzie jest główny komponent aplikacji.
4. Usuń przykładowy licznik, logo i style z szablonu.
5. W `App.tsx` pokaż nagłówek `DevTrack` i krótki opis projektu.
6. Uprość style w jednym pliku CSS.
7. W katalogu głównym dodaj `.gitignore`.
8. Zrób pierwszy commit i tag `checkpoint-01`.
9. Dodatkowo przećwicz Git: utwórz branch, zmień krótki tekst, zrób commit i przygotuj PR.

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

Dodajesz pierwszą prawdziwą funkcję: listę zadań i formularz dodawania. Przy okazji dzielisz widok na mniejsze komponenty i od razu typujesz dane w TypeScripcie.

### Instrukcja

1. Dodaj typy `TaskStatus`, `TaskPriority` i `Task` w `types.ts`.
2. Przygotuj plik z trzema przykładowymi zadaniami.
3. Stwórz `TaskItem`, który pokazuje tytuł, opis i status zadania.
4. Stwórz `TaskList`, który renderuje listę albo komunikat o braku zadań.
5. Stwórz `TaskForm` z polami: tytuł, opis i priorytet.
6. Po wysłaniu formularza dodaj nowe zadanie do stanu w `App`.
7. Dodaj proste style dla listy, formularza, statusów i priorytetów.
8. Uruchom typecheck oraz build.
9. Zrób commit i tag `checkpoint-02`.

**Dla chętnych:** dodaj kliknięcie zadania, które oznacza je jako zrobione.

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

Aplikacja dostaje kilka ekranów: logowanie, listę projektów i szczegóły projektu. Dodajesz też prosty globalny stan użytkownika, żeby można było chronić wybrane trasy.

### Instrukcja

1. Zainstaluj `react-router-dom`.
2. Dodaj typy `Project` i `User`.
3. Przygotuj mocki projektów i zadania przypisane do projektu.
4. Dodaj `UserContext` z funkcjami `login` i `logout`.
5. Stwórz `ProtectedRoute`, który wpuszcza tylko zalogowanego użytkownika.
6. Dodaj stronę logowania z jednym polem na imię.
7. Dodaj stronę projektów z linkami do szczegółów.
8. Dodaj stronę szczegółów projektu z listą zadań i formularzem.
9. Skonfiguruj routing w `App.tsx`.
10. Owiń aplikację w `BrowserRouter` i `UserProvider`.
11. Uruchom sprawdzenie projektu i zrób commit z tagiem `checkpoint-03`.

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

Porządkujesz typy i ćwiczysz kilka narzędzi TypeScript, które często pojawiają się w prawdziwych projektach. To mały refactor, bez dużej zmiany działania aplikacji.

### Instrukcja

1. Dodaj `NewTaskInput`, czyli typ danych potrzebnych do utworzenia zadania.
2. Dodaj typ `Comment`, który przyda się później przy bazie danych.
3. Sprawdź, czy `tsconfig.json` ma włączone ścisłe sprawdzanie typów.
4. Dodaj prosty przykład typu `Result<T>` i funkcji zwracającej sukces albo błąd.
5. Upewnij się, że komponenty korzystają ze wspólnych typów z `types.ts`.
6. Popraw miejsca, gdzie typy są powielone albo wpisane ręcznie.
7. Uruchom typecheck i build.
8. Zrób commit oraz tag `checkpoint-04`.

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

Dodajesz własny hook do pracy z listą elementów. Potem używasz go przy zadaniach i dodajesz prostą interakcję: kliknięcie zadania zmienia jego status.

### Instrukcja

1. Stwórz hook `useEntityList<T extends { id: string }>`.
2. Hook ma zwracać listę oraz funkcje `add`, `remove` i `update`.
3. Dodaj do `TaskItem` opcjonalny handler kliknięcia.
4. Przekaż handler przez `TaskList`.
5. W szczegółach projektu użyj `useEntityList` zamiast ręcznego `useState`.
6. Dodaj mapę kolejnych statusów: `TODO`, `IN_PROGRESS`, `DONE`.
7. Po kliknięciu zadania ustaw następny status.
8. Dodaj delikatny styl dla klikalnego zadania.
9. Sprawdź projekt i zrób commit z tagiem `checkpoint-05`.

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

Zadania przestają być trzymane tylko w kodzie. Podłączasz aplikację do prostego REST API i dodajesz obsługę ładowania oraz błędów.

### Instrukcja

1. Zainstaluj `json-server` jako narzędzie deweloperskie.
2. Dodaj `projectId` do typu `Task`.
3. Przenieś dane projektów i zadań do `db.json`.
4. Stwórz prosty wrapper na `fetch`: `apiGet`, `apiPost`, `apiPatch`.
5. Dodaj własny błąd `ApiError` dla nieudanych odpowiedzi.
6. Napisz hooki `useProjects`, `useProject` i `useProjectTasks`.
7. W hookach obsłuż `loading`, `error` i dane.
8. Przepisz strony, żeby korzystały z hooków zamiast importów mocków.
9. Dodaj skrypt startujący mock API na porcie 4000.
10. Uruchom typecheck, build, a potem zrób commit i tag `checkpoint-06`.

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

Przenosisz frontend z Vite do Next.js. Routing nie będzie już ustawiany ręcznie w React Routerze, tylko przez pliki w katalogu `app`. Dodajesz też pierwszy mały backend w Next.js.

### Instrukcja

1. Zainstaluj `next` i usuń zależności Vite.
2. Usuń pliki, które były potrzebne tylko w Vite.
3. Utwórz strukturę `src/app` z podstronami `login`, `projects` i `projects/[id]`.
4. Przenieś globalne style do `app/globals.css`.
5. Dodaj `layout.tsx`, `page.tsx` i `providers.tsx`.
6. Dodaj Route Handlery dla listy projektów i szczegółów projektu.
7. Przepisz strony na App Router.
8. Zamień `react-router-dom` na `next/link` i `next/navigation`.
9. Dopisz `'use client'` w komponentach z hookami, zdarzeniami albo Contextem.
10. Zaktualizuj klienta API: projekty idą przez `/api`, zadania jeszcze przez port 4000.
11. Uruchom typecheck, build i zrób commit z tagiem `checkpoint-07`.

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

Tworzysz osobny backend w Expressie. Od tego momentu zadania obsługuje samodzielne API, a nie mockowany serwer JSON.

### Instrukcja

1. Utwórz katalog `server` jako osobny projekt npm.
2. Zainstaluj `express`, `cors` i `zod`.
3. Dodaj TypeScript, `tsx` i potrzebne typy jako dev dependencies.
4. Przygotuj `tsconfig.json` dla backendu.
5. Dodaj typy domenowe po stronie serwera.
6. Stwórz prosty magazyn zadań w pamięci procesu.
7. Dodaj schematy Zod do tworzenia i aktualizacji zadania.
8. Dodaj middleware do obsługi błędów.
9. Stwórz router `/tasks` z pełnym CRUD.
10. Dodaj `/health`, CORS i `express.json()` w pliku startowym.
11. Usuń `json-server` z klienta.
12. Sprawdź backend i frontend, zrób commit oraz tag `checkpoint-08`.

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

Dodajesz normalne logowanie. Użytkownik rejestruje konto, loguje się hasłem, dostaje token JWT i dopiero z tym tokenem może korzystać z chronionych endpointów.

### Instrukcja

1. W serwerze zainstaluj `bcryptjs` i `jsonwebtoken`.
2. Dodaj tymczasowy magazyn użytkowników w pamięci.
3. Dodaj funkcje do tworzenia i sprawdzania tokenów JWT.
4. Dodaj schematy walidacji rejestracji i logowania.
5. Stwórz router `/auth` z endpointami `register` i `login`.
6. Dodaj middleware `requireAuth`.
7. Zabezpiecz router zadań tokenem.
8. W kliencie zmień `User` na `id`, `email`, `name`.
9. Zapisuj token i użytkownika w `localStorage`.
10. Dodawaj nagłówek `Authorization` do zapytań API.
11. Przepisz stronę logowania na formularz email/hasło z trybem rejestracji.
12. Uruchom testy/buildujące komendy i zrób commit z tagiem `checkpoint-09`.

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

Zamieniasz dane trzymane w pamięci na prawdziwą bazę PostgreSQL obsługiwaną przez Prisma. Dzięki temu dane nie znikają po restarcie serwera.

### Instrukcja

1. Zainstaluj `@prisma/client` i CLI `prisma`.
2. Dodaj `schema.prisma` z modelami `User`, `Project`, `Task` i `Comment`.
3. Dodaj enumy statusu i priorytetu zadania.
4. Przygotuj `.env.example` z `DATABASE_URL`.
5. Wygeneruj klienta Prisma.
6. Dodaj migrację startową i seed z danymi demo.
7. Zastąp store w pamięci serwisami opartymi o Prisma.
8. Dodaj router `/projects` filtrowany po zalogowanym użytkowniku.
9. Dodaj endpointy komentarzy dla zadań.
10. Usuń mockowe API projektów z Next.js.
11. Sprawdź typecheck i build po obu stronach.
12. Zrób commit oraz tag `checkpoint-10`.

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

Dodajesz pierwsze testy. Testujesz małe kawałki frontendu i backendu, żeby szybciej łapać błędy po zmianach.

### Instrukcja

1. W kliencie zainstaluj Jest, `jest-environment-jsdom` i Testing Library.
2. Skonfiguruj Jest przez `next/jest`.
3. Napisz testy dla `TaskItem`.
4. Napisz testy dla `TaskList`.
5. Napisz testy dla `TaskForm`.
6. Napisz test hooka `useEntityList`.
7. W serwerze zainstaluj Jest, `ts-jest` i Supertest.
8. Wydziel `app.ts`, żeby testy nie startowały portu.
9. Napisz testy walidacji Zod i modułu JWT.
10. Napisz prosty test routera zadań z mockami.
11. Uruchom testy, typecheck i build.
12. Zrób commit z tagiem `checkpoint-11`.

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

Pakujesz aplikację do kontenerów. Frontend, backend i baza mogą być uruchamiane jednym poleceniem przez Docker Compose.

### Instrukcja

1. Dodaj Dockerfile dla `server` z etapami instalacji, builda i uruchomienia.
2. Dodaj entrypoint serwera, który uruchamia migracje Prisma przed startem aplikacji.
3. Dodaj Dockerfile dla `client` z buildem Next.js.
4. Ustaw Next.js na output `standalone`.
5. Dodaj `docker-compose.yml` z usługami `db`, `server` i `client`.
6. Przekaż `DATABASE_URL`, `JWT_SECRET` i adres API przez zmienne środowiskowe.
7. Sprawdź zwykły build klienta i serwera.
8. Jeśli Docker działa lokalnie, sprawdź też `docker compose build`.
9. Zrób commit i tag `checkpoint-12`.

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

Dodajesz automatyczne sprawdzanie projektu w GitHub Actions. Dzięki temu po pushu albo PR repo samo uruchomi testy i build.

### Instrukcja

1. Utwórz `.github/workflows/ci.yml`.
2. Dodaj job `server`.
3. W jobie serwera uruchom `npm ci`, `prisma generate`, typecheck, test i build.
4. Dodaj job `client`.
5. W jobie klienta uruchom `npm ci`, typecheck, test i build.
6. Dodaj job `docker-build`, który zależy od klienta i serwera.
7. Dodaj opcjonalny, wyłączony job deploy.
8. Zrób commit i tag `checkpoint-13`.

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

Dodajesz prosty log zdarzeń i panel statystyk. To ma pokazać, jak z danych aplikacji można zrobić pierwsze informacje analityczne.

### Instrukcja

1. Dodaj model `ActivityLog` w Prisma.
2. Dodaj indeksy na `Task.projectId` i `Task.status`.
3. Przygotuj migrację dla nowych tabel i indeksów.
4. Dodaj serwis do zapisywania zdarzeń.
5. Loguj utworzenie zadania i zmianę statusu.
6. Dodaj endpoint `/projects/:id/stats`.
7. W kliencie dodaj hook pobierający statystyki.
8. Dodaj panel z licznikami statusów i ostatnią aktywnością.
9. Dodaj prosty eksport logów do pliku JSON.
10. Uruchom walidację i zrób commit z tagiem `checkpoint-14`.

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

Na końcu dodajesz prostą integrację z API AI. Klucz API zostaje po stronie serwera, a frontend tylko woła własne endpointy backendu.

### Instrukcja

1. Zainstaluj SDK dostawcy AI w `server`.
2. Dodaj serwis AI z funkcją podsumowania tekstu.
3. Dodaj funkcję odpowiadania na pytanie o projekt na podstawie zadań.
4. Obsłuż brak klucza API czytelnym błędem `503`.
5. Dodaj endpoint `POST /tasks/:id/summarize`.
6. Dodaj endpoint `POST /projects/:id/ask`.
7. W kliencie dodaj przycisk `Podsumuj AI` przy zadaniu.
8. Zatrzymaj propagację kliknięcia przycisku, żeby nie zmieniać statusu zadania.
9. Dodaj prosty komponent asystenta projektu.
10. Sprawdź typecheck, testy i build.
11. Zrób commit oraz tag `checkpoint-15`.

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

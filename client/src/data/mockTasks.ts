import type { Task } from '../types'

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Skonfigurowac repozytorium',
    description: 'Dodac .gitignore, README i pierwszy commit.',
    status: 'DONE',
    priority: 'MEDIUM',
  },
  {
    id: '2',
    title: 'Zaprojektowac widok listy zadan',
    description: 'Layout listy oraz prosty formularz dodawania.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
  },
  {
    id: '3',
    title: 'Dodac routing aplikacji',
    description: 'Strony: lista projektow, szczegoly projektu i logowanie.',
    status: 'TODO',
    priority: 'LOW',
  },
]

import { randomUUID } from 'node:crypto'
import type { Task } from '../types/index.js'

let tasks: Task[] = [
  {
    id: '1',
    projectId: 'p1',
    title: 'Skonfigurowac repozytorium',
    description: 'Dodac .gitignore, README i pierwszy commit.',
    status: 'DONE',
    priority: 'MEDIUM',
  },
  {
    id: '2',
    projectId: 'p1',
    title: 'Zaprojektowac widok listy zadan',
    description: 'Layout listy oraz prosty formularz dodawania.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
  },
  {
    id: '3',
    projectId: 'p1',
    title: 'Dodac routing aplikacji',
    description: 'Strony: lista projektow, szczegoly projektu i logowanie.',
    status: 'TODO',
    priority: 'LOW',
  },
  {
    id: '4',
    projectId: 'p2',
    title: 'Makieta ekranu zamowienia',
    description: 'Figma: ekran wyboru dan i koszyka.',
    status: 'TODO',
    priority: 'MEDIUM',
  },
]

export function listTasks(projectId?: string): Task[] {
  if (!projectId) return tasks
  return tasks.filter((task) => task.projectId === projectId)
}

export function getTask(id: string): Task | undefined {
  return tasks.find((task) => task.id === id)
}

export function createTask(input: Omit<Task, 'id'>): Task {
  const task: Task = { id: randomUUID(), ...input }
  tasks.push(task)
  return task
}

export function updateTask(
  id: string,
  changes: Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority'>>,
): Task | undefined {
  const task = tasks.find((item) => item.id === id)
  if (!task) return undefined
  Object.assign(task, changes)
  return task
}

export function deleteTask(id: string): boolean {
  const previousLength = tasks.length
  tasks = tasks.filter((task) => task.id !== id)
  return tasks.length < previousLength
}

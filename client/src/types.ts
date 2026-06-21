export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
}

export interface Project {
  id: string
  name: string
  description: string
}

export interface User {
  name: string
}

export interface Comment {
  id: string
  taskId: string
  author: string
  content: string
  createdAt: string
}

export type NewTaskInput = Omit<Task, 'id' | 'status'> & { status?: TaskStatus }

export type Result<T> = { success: true; data: T } | { success: false; error: string }

export function parseTaskPriority(value: string): Result<TaskPriority> {
  if (value === 'LOW' || value === 'MEDIUM' || value === 'HIGH') {
    return { success: true, data: value }
  }

  return { success: false, error: `Nieznany priorytet: ${value}` }
}

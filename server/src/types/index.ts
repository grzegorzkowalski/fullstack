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

export interface Project {
  id: string
  name: string
  description: string
}

export interface User {
  id: string
  email: string
  name: string
  passwordHash: string
}

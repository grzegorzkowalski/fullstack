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
}

export interface AuthResponse {
  token: string
  user: User
}

export interface ActivityLog {
  id: string
  taskId: string
  action: string
  payload: unknown
  createdAt: string
  task: Pick<Task, 'id' | 'title'>
}

export interface ProjectStats {
  statusCounts: Record<TaskStatus, number>
  recentActivity: ActivityLog[]
}

export interface Comment {
  id: string
  taskId: string
  author: string
  content: string
  createdAt: string
}

export type NewTaskInput = Omit<Task, 'id' | 'status' | 'projectId'> & { status?: TaskStatus }

export type Result<T> = { success: true; data: T } | { success: false; error: string }

export function parseTaskPriority(value: string): Result<TaskPriority> {
  if (value === 'LOW' || value === 'MEDIUM' || value === 'HIGH') {
    return { success: true, data: value }
  }

  return { success: false, error: `Nieznany priorytet: ${value}` }
}

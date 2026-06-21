const PROJECTS_API_BASE = '/api'
const TASKS_API_BASE = 'http://localhost:4000'
const TOKEN_STORAGE_KEY = 'devtrack_token'

function resolveBase(path: string): string {
  return path.startsWith('/projects') ? PROJECTS_API_BASE : TASKS_API_BASE
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
}

function authHeaders(includeAuth: boolean): HeadersInit {
  const token = includeAuth ? getToken() : null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(`Blad API: ${response.status} ${response.statusText}`, response.status)
  }

  return response.json() as Promise<T>
}

export async function apiGet<T>(path: string, includeAuth = true): Promise<T> {
  const response = await fetch(`${resolveBase(path)}${path}`, {
    headers: authHeaders(includeAuth),
  })
  return handleResponse<T>(response)
}

export async function apiPost<T>(path: string, body: unknown, includeAuth = true): Promise<T> {
  const response = await fetch(`${resolveBase(path)}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(includeAuth) },
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

export async function apiPatch<T>(path: string, body: unknown, includeAuth = true): Promise<T> {
  const response = await fetch(`${resolveBase(path)}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...authHeaders(includeAuth) },
    body: JSON.stringify(body),
  })
  return handleResponse<T>(response)
}

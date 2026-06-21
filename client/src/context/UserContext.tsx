'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { apiPost, clearToken, getToken, setToken } from '../api/client'
import type { AuthResponse, User } from '../types'

interface UserContextValue {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, name: string, password: string) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextValue | null>(null)
const USER_STORAGE_KEY = 'devtrack_user'

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    const storedUser = window.localStorage.getItem(USER_STORAGE_KEY)
    if (token && storedUser) {
      setUser(JSON.parse(storedUser) as User)
    }
    setLoading(false)
  }, [])

  function persistSession(auth: AuthResponse) {
    setToken(auth.token)
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(auth.user))
    setUser(auth.user)
  }

  async function login(email: string, password: string) {
    const auth = await apiPost<AuthResponse>('/auth/login', { email, password }, false)
    persistSession(auth)
  }

  async function register(email: string, name: string, password: string) {
    const auth = await apiPost<AuthResponse>(
      '/auth/register',
      { email, name, password },
      false,
    )
    persistSession(auth)
  }

  function logout() {
    clearToken()
    window.localStorage.removeItem(USER_STORAGE_KEY)
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used inside UserProvider')
  }
  return context
}

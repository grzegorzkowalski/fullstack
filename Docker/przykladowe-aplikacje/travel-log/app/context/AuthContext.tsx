'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { API_URL } from '@/app/lib/api';

const STORAGE_KEY = 'travel-log-jwt';

type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  login: (login: string, haslo: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // Odtworzenie sesji po odświeżeniu strony (sessionStorage przetrwa refresh,
  // ale nie przetrwa zamknięcia karty — to jest "do czasu wylogowania").
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setToken(saved);
  }, []);

  async function login(loginValue: string, haslo: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: loginValue, haslo }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error ?? 'Logowanie nie powiodło się');
    }

    const data = await res.json();
    setToken(data.token);
    sessionStorage.setItem(STORAGE_KEY, data.token);
  }

  function logout() {
    setToken(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth musi być użyty wewnątrz <AuthProvider>');
  }
  return ctx;
}

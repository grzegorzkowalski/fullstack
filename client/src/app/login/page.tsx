'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/UserContext'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { login, register } = useUser()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    try {
      if (mode === 'register') {
        await register(email, name, password)
      } else {
        await login(email, password)
      }
      router.push('/projects')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nie udalo sie uwierzytelnic')
    }
  }

  return (
    <form className="task-form auth-panel" onSubmit={handleSubmit}>
      <h2>{mode === 'login' ? 'Logowanie' : 'Rejestracja'}</h2>
      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="anna@example.com"
        required
      />
      {mode === 'register' && (
        <>
          <label htmlFor="name">Imie</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="np. Anna"
            required
          />
        </>
      )}
      <label htmlFor="password">Haslo</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={mode === 'register' ? 8 : 1}
        required
      />
      {error && <p className="error-state">{error}</p>}
      <button type="submit">{mode === 'login' ? 'Zaloguj' : 'Utworz konto'}</button>
      <button
        type="button"
        className="secondary-button"
        onClick={() => setMode((current) => (current === 'login' ? 'register' : 'login'))}
      >
        {mode === 'login' ? 'Przejdz do rejestracji' : 'Mam juz konto'}
      </button>
    </form>
  )
}

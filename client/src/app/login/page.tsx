'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../context/UserContext'

export default function LoginPage() {
  const [name, setName] = useState('')
  const router = useRouter()
  const { login } = useUser()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    login(trimmedName)
    router.push('/projects')
  }

  return (
    <form className="task-form auth-panel" onSubmit={handleSubmit}>
      <h2>Logowanie</h2>
      <label htmlFor="name">Imie</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="np. Anna"
        required
      />
      <button type="submit">Zaloguj</button>
    </form>
  )
}

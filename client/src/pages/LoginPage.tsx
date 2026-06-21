import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

function LoginPage() {
  const [name, setName] = useState('')
  const navigate = useNavigate()
  const { login } = useUser()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) return
    login(trimmedName)
    navigate('/projects')
  }

  return (
    <main className="auth-layout">
      <form className="task-form" onSubmit={handleSubmit}>
        <h1>DevTrack</h1>
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
    </main>
  )
}

export default LoginPage

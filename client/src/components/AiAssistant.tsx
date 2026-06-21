'use client'

import { useState, type FormEvent } from 'react'
import { apiPost } from '../api/client'

function AiAssistant({ projectId }: { projectId: string }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!question.trim()) return
    setLoading(true)
    setError(null)

    try {
      const result = await apiPost<{ answer: string }>(`/projects/${projectId}/ask`, {
        question,
      })
      setAnswer(result.answer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cos poszlo nie tak')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="ai-assistant">
      <h2>Asystent projektu</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="Twoje pytanie..."
        />
        <button type="submit">{loading ? 'Pytam...' : 'Zapytaj'}</button>
      </form>
      {answer && <p className="ai-summary">{answer}</p>}
      {error && <p className="error-state">{error}</p>}
    </section>
  )
}

export default AiAssistant

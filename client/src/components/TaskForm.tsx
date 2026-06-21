import { useState, type FormEvent } from 'react'
import type { Task, TaskPriority } from '../types'

interface TaskFormProps {
  onAddTask: (task: Task) => void
}

function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('MEDIUM')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim()) return

    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      status: 'TODO',
      priority,
    })

    setTitle('')
    setDescription('')
    setPriority('MEDIUM')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>Nowe zadanie</h3>
      <input
        type="text"
        placeholder="Tytul zadania"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <textarea
        placeholder="Opis (opcjonalnie)"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        rows={3}
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value as TaskPriority)}
      >
        <option value="LOW">Niski priorytet</option>
        <option value="MEDIUM">Sredni priorytet</option>
        <option value="HIGH">Wysoki priorytet</option>
      </select>
      <button type="submit">Dodaj zadanie</button>
    </form>
  )
}

export default TaskForm

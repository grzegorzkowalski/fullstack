import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { projects } from '../data/mockProjects'
import { tasksByProject } from '../data/mockTasks'
import type { NewTaskInput, Task } from '../types'

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((item) => item.id === id)
  const [tasks, setTasks] = useState<Task[]>(id ? tasksByProject[id] ?? [] : [])

  function handleAddTask(task: NewTaskInput) {
    setTasks((previousTasks) => [
      ...previousTasks,
      {
        ...task,
        id: crypto.randomUUID(),
        status: task.status ?? 'TODO',
      },
    ])
  }

  if (!project) {
    return (
      <div className="app">
        <p>Projekt nie istnieje.</p>
        <Link to="/projects">Wroc do projektow</Link>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <Link to="/projects">Wroc do projektow</Link>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </header>
      <main>
        <section>
          <h2>Zadania projektu</h2>
          <TaskList tasks={tasks} />
        </section>
        <section>
          <TaskForm onAddTask={handleAddTask} />
        </section>
      </main>
    </div>
  )
}

export default ProjectDetailPage

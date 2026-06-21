import { Link, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { projects } from '../data/mockProjects'
import { tasksByProject } from '../data/mockTasks'
import { useEntityList } from '../hooks/useEntityList'
import type { NewTaskInput, Task, TaskStatus } from '../types'

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  TODO: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE: 'TODO',
}

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((item) => item.id === id)
  const tasks = useEntityList<Task>(id ? tasksByProject[id] ?? [] : [])

  function handleAddTask(task: NewTaskInput) {
    tasks.add({
      ...task,
      id: crypto.randomUUID(),
      status: task.status ?? 'TODO',
    })
  }

  function handleTaskClick(taskId: string, currentStatus: TaskStatus) {
    tasks.update(taskId, { status: NEXT_STATUS[currentStatus] })
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
          <TaskList tasks={tasks.items} onTaskClick={handleTaskClick} />
        </section>
        <section>
          <TaskForm onAddTask={handleAddTask} />
        </section>
      </main>
    </div>
  )
}

export default ProjectDetailPage

import { Link, useParams } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { useProject } from '../hooks/useProject'
import { useProjectTasks } from '../hooks/useProjectTasks'
import type { NewTaskInput, TaskStatus } from '../types'

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  TODO: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE: 'TODO',
}

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { project, loading: projectLoading, error: projectError } = useProject(id)
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    addTask,
    updateTaskStatus,
  } = useProjectTasks(id)

  async function handleAddTask(task: NewTaskInput) {
    await addTask(task)
  }

  async function handleTaskClick(taskId: string, currentStatus: TaskStatus) {
    await updateTaskStatus(taskId, NEXT_STATUS[currentStatus])
  }

  if (projectLoading) {
    return (
      <div className="app">
        <p>Ladowanie projektu...</p>
      </div>
    )
  }

  if (projectError || !project) {
    return (
      <div className="app">
        <p className="error-state">Projekt nie istnieje albo API nie jest uruchomione.</p>
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
          {tasksLoading && <p>Ladowanie zadan...</p>}
          {tasksError && <p className="error-state">Nie udalo sie pobrac zadan: {tasksError}</p>}
          <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
        </section>
        <section>
          <TaskForm onAddTask={handleAddTask} />
        </section>
      </main>
    </div>
  )
}

export default ProjectDetailPage

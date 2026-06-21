'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import AiAssistant from '../../../components/AiAssistant'
import ProtectedRoute from '../../../components/ProtectedRoute'
import ProjectStatsPanel from '../../../components/ProjectStatsPanel'
import TaskForm from '../../../components/TaskForm'
import TaskList from '../../../components/TaskList'
import { useProject } from '../../../hooks/useProject'
import { useProjectStats } from '../../../hooks/useProjectStats'
import { useProjectTasks } from '../../../hooks/useProjectTasks'
import type { NewTaskInput, TaskStatus } from '../../../types'

const NEXT_STATUS: Record<TaskStatus, TaskStatus> = {
  TODO: 'IN_PROGRESS',
  IN_PROGRESS: 'DONE',
  DONE: 'TODO',
}

function ProjectDetailContent() {
  const params = useParams<{ id: string }>()
  const projectId = params.id
  const { project, loading: projectLoading, error: projectError } = useProject(projectId)
  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    addTask,
    updateTaskStatus,
  } = useProjectTasks(projectId)
  const stats = useProjectStats(projectId)

  async function handleAddTask(task: NewTaskInput) {
    await addTask(task)
    stats.refetch()
  }

  async function handleTaskClick(taskId: string, currentStatus: TaskStatus) {
    await updateTaskStatus(taskId, NEXT_STATUS[currentStatus])
    stats.refetch()
  }

  if (projectLoading) return <p className="hint">Ladowanie projektu...</p>

  if (projectError || !project) {
    return (
      <section>
        <p className="error-state">Projekt nie istnieje albo API nie jest uruchomione.</p>
        <Link href="/projects">Wroc do projektow</Link>
      </section>
    )
  }

  return (
    <>
      <section>
        <Link href="/projects">Wroc do projektow</Link>
        <h2>{project.name}</h2>
        <p>{project.description}</p>
      </section>
      <section>
        <h2>Zadania projektu</h2>
        {tasksLoading && <p className="hint">Ladowanie zadan...</p>}
        {tasksError && <p className="error-state">Nie udalo sie pobrac zadan: {tasksError}</p>}
        <TaskList tasks={tasks} onTaskClick={handleTaskClick} />
      </section>
      <section>
        <TaskForm onAddTask={handleAddTask} />
      </section>
      <ProjectStatsPanel stats={stats.stats} loading={stats.loading} error={stats.error} />
      <AiAssistant projectId={projectId} />
    </>
  )
}

export default function ProjectDetailPage() {
  return (
    <ProtectedRoute>
      <ProjectDetailContent />
    </ProtectedRoute>
  )
}

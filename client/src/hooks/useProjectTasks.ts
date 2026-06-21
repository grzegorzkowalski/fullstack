import { useCallback, useEffect, useState } from 'react'
import { apiGet, apiPatch, apiPost } from '../api/client'
import type { NewTaskInput, Task, TaskStatus } from '../types'

export function useProjectTasks(projectId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(Boolean(projectId))
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  const refetch = useCallback(() => setVersion((current) => current + 1), [])

  useEffect(() => {
    if (!projectId) return
    let isMounted = true

    async function loadTasks() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiGet<Task[]>(`/tasks?projectId=${projectId}`)
        if (isMounted) setTasks(data)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Nieznany blad')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadTasks()
    return () => {
      isMounted = false
    }
  }, [projectId, version])

  async function addTask(task: NewTaskInput) {
    if (!projectId) return
    const created = await apiPost<Task>('/tasks', {
      ...task,
      projectId,
      status: task.status ?? 'TODO',
    })
    setTasks((previousTasks) => [...previousTasks, created])
  }

  async function updateTaskStatus(taskId: string, status: TaskStatus) {
    const updated = await apiPatch<Task>(`/tasks/${taskId}`, { status })
    setTasks((previousTasks) =>
      previousTasks.map((task) => (task.id === taskId ? updated : task)),
    )
  }

  return { tasks, loading, error, addTask, updateTaskStatus, refetch }
}

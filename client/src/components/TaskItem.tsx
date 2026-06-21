'use client'

import { useState, type MouseEvent } from 'react'
import { apiPost } from '../api/client'
import type { Task, TaskStatus } from '../types'

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'Do zrobienia',
  IN_PROGRESS: 'W toku',
  DONE: 'Zrobione',
}

interface TaskItemProps {
  task: Task
  onClick?: (taskId: string, currentStatus: TaskStatus) => void
}

function TaskItem({ task, onClick }: TaskItemProps) {
  const [summary, setSummary] = useState<string | null>(null)
  const [summaryError, setSummaryError] = useState<string | null>(null)
  const [summarizing, setSummarizing] = useState(false)

  async function handleSummarize(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    setSummarizing(true)
    setSummaryError(null)

    try {
      const result = await apiPost<{ summary: string }>(`/tasks/${task.id}/summarize`, {})
      setSummary(result.summary)
    } catch (err) {
      setSummaryError(err instanceof Error ? err.message : 'Blad podsumowania')
    } finally {
      setSummarizing(false)
    }
  }

  return (
    <li
      className={`task-item priority-${task.priority.toLowerCase()} ${onClick ? 'clickable' : ''}`}
      onClick={() => onClick?.(task.id, task.status)}
    >
      <div className="task-item-main">
        <strong>{task.title}</strong>
        <span className={`status-badge status-${task.status.toLowerCase()}`}>
          {STATUS_LABELS[task.status]}
        </span>
      </div>
      <p>{task.description}</p>
      <div className="task-actions">
        <button type="button" className="secondary-button" onClick={handleSummarize}>
          {summarizing ? 'Podsumowanie...' : 'Podsumuj AI'}
        </button>
      </div>
      {summary && <p className="ai-summary">{summary}</p>}
      {summaryError && <p className="error-state">{summaryError}</p>}
    </li>
  )
}

export default TaskItem

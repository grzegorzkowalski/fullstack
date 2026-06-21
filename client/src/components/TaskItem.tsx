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
    </li>
  )
}

export default TaskItem

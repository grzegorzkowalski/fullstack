import TaskItem from './TaskItem'
import type { Task, TaskStatus } from '../types'

interface TaskListProps {
  tasks: Task[]
  onTaskClick?: (taskId: string, currentStatus: TaskStatus) => void
}

function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">Brak zadan. Dodaj pierwsze ponizej.</p>
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </ul>
  )
}

export default TaskList

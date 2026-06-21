import type { ProjectStats, TaskStatus } from '../types'

const STATUS_LABELS: Record<TaskStatus, string> = {
  TODO: 'Do zrobienia',
  IN_PROGRESS: 'W toku',
  DONE: 'Zrobione',
}

interface ProjectStatsPanelProps {
  stats: ProjectStats | null
  loading: boolean
  error: string | null
}

function ProjectStatsPanel({ stats, loading, error }: ProjectStatsPanelProps) {
  if (loading) return <p className="hint">Ladowanie statystyk...</p>
  if (error) return <p className="error-state">Nie udalo sie pobrac statystyk: {error}</p>
  if (!stats) return null

  return (
    <section className="stats-panel">
      <h2>Statystyki</h2>
      <div className="stats-grid">
        {(Object.keys(STATUS_LABELS) as TaskStatus[]).map((status) => (
          <div className="stat-tile" key={status}>
            <strong>{stats.statusCounts[status] ?? 0}</strong>
            <span>{STATUS_LABELS[status]}</span>
          </div>
        ))}
      </div>
      <h3>Ostatnia aktywnosc</h3>
      {stats.recentActivity.length === 0 ? (
        <p className="empty-state">Brak zdarzen.</p>
      ) : (
        <ul className="activity-list">
          {stats.recentActivity.map((item) => (
            <li key={item.id}>
              <strong>{item.action}</strong>
              <span>{item.task.title}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProjectStatsPanel

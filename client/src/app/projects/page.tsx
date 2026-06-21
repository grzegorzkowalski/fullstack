'use client'

import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import { useUser } from '../../context/UserContext'
import { useProjects } from '../../hooks/useProjects'

function ProjectsContent() {
  const { user, logout } = useUser()
  const { projects, loading, error } = useProjects()

  if (!user) return null

  return (
    <section>
      <div className="page-header">
        <div>
          <h2>Twoje projekty</h2>
          <p className="hint">Zalogowano jako {user.name}</p>
        </div>
        <button type="button" onClick={logout}>
          Wyloguj
        </button>
      </div>
      {loading && <p className="hint">Wczytywanie projektow...</p>}
      {error && <p className="error-state">Nie udalo sie wczytac projektow ({error}).</p>}
      <div className="project-list">
        {projects.map((project) => (
          <Link className="project-card" href={`/projects/${project.id}`} key={project.id}>
            <strong>{project.name}</strong>
            <span>{project.description}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default function ProjectsPage() {
  return (
    <ProtectedRoute>
      <ProjectsContent />
    </ProtectedRoute>
  )
}

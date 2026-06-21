import { Link } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useProjects } from '../hooks/useProjects'

function ProjectsPage() {
  const { user, logout } = useUser()
  const { projects, loading, error } = useProjects()

  return (
    <div className="app">
      <header className="app-header header-row">
        <div>
          <h1>DevTrack</h1>
          <p>Zalogowany uzytkownik: {user?.name}</p>
        </div>
        <button type="button" onClick={logout}>
          Wyloguj
        </button>
      </header>
      <main>
        <section>
          <h2>Projekty</h2>
          {loading && <p>Ladowanie projektow...</p>}
          {error && <p className="error-state">API nie jest uruchomione: {error}</p>}
          <div className="project-list">
            {projects.map((project) => (
              <Link className="project-card" to={`/projects/${project.id}`} key={project.id}>
                <strong>{project.name}</strong>
                <span>{project.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProjectsPage

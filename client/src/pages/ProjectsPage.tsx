import { Link } from 'react-router-dom'
import { projects } from '../data/mockProjects'
import { useUser } from '../context/UserContext'

function ProjectsPage() {
  const { user, logout } = useUser()

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

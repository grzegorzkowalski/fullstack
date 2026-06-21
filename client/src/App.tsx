import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { initialTasks } from './data/mockTasks'
import type { Task } from './types'

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  function handleAddTask(newTask: Task) {
    setTasks((previousTasks) => [...previousTasks, newTask])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>DevTrack</h1>
        <p>Mini-system zarzadzania zadaniami projektowymi</p>
      </header>
      <main>
        <section>
          <h2>Zadania</h2>
          <TaskList tasks={tasks} />
        </section>
        <section>
          <TaskForm onAddTask={handleAddTask} />
        </section>
      </main>
    </div>
  )
}

export default App

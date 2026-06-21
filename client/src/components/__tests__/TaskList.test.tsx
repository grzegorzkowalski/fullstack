import { render, screen } from '@testing-library/react'
import TaskList from '../TaskList'
import type { Task } from '../../types'

const tasks: Task[] = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Pierwsze zadanie',
    description: '',
    status: 'DONE',
    priority: 'LOW',
  },
]

describe('TaskList', () => {
  it('renderuje liste zadan', () => {
    render(<TaskList tasks={tasks} />)

    expect(screen.getByText('Pierwsze zadanie')).toBeInTheDocument()
  })

  it('renderuje empty state', () => {
    render(<TaskList tasks={[]} />)

    expect(screen.getByText(/Brak zadan/)).toBeInTheDocument()
  })
})

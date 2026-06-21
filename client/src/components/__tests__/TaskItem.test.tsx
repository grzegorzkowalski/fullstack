import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskItem from '../TaskItem'
import type { Task } from '../../types'

const task: Task = {
  id: 't1',
  projectId: 'p1',
  title: 'Napisac testy',
  description: 'Pokryc podstawowe komponenty.',
  status: 'TODO',
  priority: 'HIGH',
}

describe('TaskItem', () => {
  it('renderuje tresc zadania', () => {
    render(<TaskItem task={task} />)

    expect(screen.getByText('Napisac testy')).toBeInTheDocument()
    expect(screen.getByText('Pokryc podstawowe komponenty.')).toBeInTheDocument()
    expect(screen.getByText('Do zrobienia')).toBeInTheDocument()
  })

  it('wywoluje onClick z id i statusem', async () => {
    const user = userEvent.setup()
    const onClick = jest.fn()

    render(<TaskItem task={task} onClick={onClick} />)
    await user.click(screen.getByText('Napisac testy'))

    expect(onClick).toHaveBeenCalledWith('t1', 'TODO')
  })

  it('nie ma klasy clickable bez handlera', () => {
    const { container } = render(<TaskItem task={task} />)

    expect(container.querySelector('.task-item')).not.toHaveClass('clickable')
  })
})

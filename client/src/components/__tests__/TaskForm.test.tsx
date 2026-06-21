import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskForm from '../TaskForm'

describe('TaskForm', () => {
  it('wysyla dane formularza i czysci pola', async () => {
    const user = userEvent.setup()
    const onAddTask = jest.fn()

    render(<TaskForm onAddTask={onAddTask} />)

    await user.type(screen.getByPlaceholderText('Tytul zadania'), 'Nowy task')
    await user.type(screen.getByPlaceholderText('Opis (opcjonalnie)'), 'Opis taska')
    await user.selectOptions(screen.getByRole('combobox'), 'HIGH')
    await user.click(screen.getByRole('button', { name: 'Dodaj zadanie' }))

    expect(onAddTask).toHaveBeenCalledWith({
      title: 'Nowy task',
      description: 'Opis taska',
      status: 'TODO',
      priority: 'HIGH',
    })
    expect(screen.getByPlaceholderText('Tytul zadania')).toHaveValue('')
  })

  it('nie wysyla pustego tytulu', async () => {
    const user = userEvent.setup()
    const onAddTask = jest.fn()

    render(<TaskForm onAddTask={onAddTask} />)
    await user.click(screen.getByRole('button', { name: 'Dodaj zadanie' }))

    expect(onAddTask).not.toHaveBeenCalled()
  })
})

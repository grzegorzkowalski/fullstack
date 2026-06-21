import { createTaskSchema, updateTaskSchema } from './taskSchemas'

describe('taskSchemas', () => {
  it('uzupelnia domyslne pola przy tworzeniu zadania', () => {
    const result = createTaskSchema.parse({ projectId: 'p1', title: 'Nowe zadanie' })

    expect(result).toEqual({
      projectId: 'p1',
      title: 'Nowe zadanie',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
    })
  })

  it('odrzuca pusta aktualizacje', () => {
    expect(() => updateTaskSchema.parse({})).toThrow('Podaj przynajmniej jedno pole')
  })
})

import { Router } from 'express'
import {
  createTask,
  deleteTask,
  getTask,
  listTasks,
  updateTask,
} from '../store/tasksStore.js'
import { createTaskSchema, updateTaskSchema } from '../validation/taskSchemas.js'

export const tasksRouter = Router()

tasksRouter.get('/', (req, res) => {
  const projectId = typeof req.query.projectId === 'string' ? req.query.projectId : undefined
  res.json(listTasks(projectId))
})

tasksRouter.get('/:id', (req, res) => {
  const task = getTask(req.params.id)
  if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
  return res.json(task)
})

tasksRouter.post('/', (req, res, next) => {
  try {
    const input = createTaskSchema.parse(req.body)
    res.status(201).json(createTask(input))
  } catch (err) {
    next(err)
  }
})

tasksRouter.patch('/:id', (req, res, next) => {
  try {
    const changes = updateTaskSchema.parse(req.body)
    const task = updateTask(req.params.id, changes)
    if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
    return res.json(task)
  } catch (err) {
    next(err)
  }
})

tasksRouter.delete('/:id', (req, res) => {
  if (!deleteTask(req.params.id)) {
    return res.status(404).json({ message: 'Zadanie nie istnieje' })
  }
  return res.status(204).send()
})

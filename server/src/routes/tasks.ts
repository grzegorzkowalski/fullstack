import { Router } from 'express'
import {
  createComment,
  createTask,
  deleteTask,
  getTask,
  listComments,
  listTasks,
  updateTask,
} from '../services/tasksService.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { createTaskSchema, updateTaskSchema } from '../validation/taskSchemas.js'
import { z } from 'zod'

export const tasksRouter = Router()

tasksRouter.use(requireAuth)

const createCommentSchema = z.object({
  content: z.string().min(1).max(2000),
})

tasksRouter.get('/', async (req, res) => {
  const projectId = typeof req.query.projectId === 'string' ? req.query.projectId : undefined
  res.json(await listTasks(projectId))
})

tasksRouter.get('/:id', async (req, res) => {
  const task = await getTask(req.params.id)
  if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
  return res.json(task)
})

tasksRouter.post('/', async (req, res, next) => {
  try {
    const input = createTaskSchema.parse(req.body)
    res.status(201).json(await createTask(input))
  } catch (err) {
    next(err)
  }
})

tasksRouter.patch('/:id', async (req, res, next) => {
  try {
    const changes = updateTaskSchema.parse(req.body)
    const task = await updateTask(req.params.id, changes)
    if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
    return res.json(task)
  } catch (err) {
    next(err)
  }
})

tasksRouter.delete('/:id', async (req, res) => {
  if (!(await deleteTask(req.params.id))) {
    return res.status(404).json({ message: 'Zadanie nie istnieje' })
  }
  return res.status(204).send()
})

tasksRouter.get('/:id/comments', async (req, res) => {
  const task = await getTask(req.params.id)
  if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
  return res.json(await listComments(req.params.id))
})

tasksRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const task = await getTask(req.params.id)
    if (!task) return res.status(404).json({ message: 'Zadanie nie istnieje' })
    const input = createCommentSchema.parse(req.body)
    return res.status(201).json(
      await createComment({
        taskId: req.params.id,
        authorId: req.user!.sub,
        content: input.content,
      }),
    )
  } catch (err) {
    return next(err)
  }
})

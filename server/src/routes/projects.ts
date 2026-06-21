import { Router } from 'express'
import { z } from 'zod'
import { requireAuth } from '../middleware/requireAuth.js'
import { getRecentActivity, getStatusCounts } from '../services/activityService.js'
import { answerProjectQuestion } from '../services/aiService.js'
import {
  createProject,
  getProjectForUser,
  listProjectsForUser,
} from '../services/projectsService.js'
import { listTasks } from '../services/tasksService.js'

export const projectsRouter = Router()

projectsRouter.use(requireAuth)

const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
})

const askProjectSchema = z.object({
  question: z.string().min(1).max(1000),
})

projectsRouter.get('/', async (req, res) => {
  res.json(await listProjectsForUser(req.user!.sub))
})

projectsRouter.get('/:id', async (req, res) => {
  const project = await getProjectForUser(req.params.id, req.user!.sub)
  if (!project) return res.status(404).json({ message: 'Projekt nie istnieje' })
  return res.json(project)
})

projectsRouter.get('/:id/stats', async (req, res) => {
  const project = await getProjectForUser(req.params.id, req.user!.sub)
  if (!project) return res.status(404).json({ message: 'Projekt nie istnieje' })

  const [statusCounts, recentActivity] = await Promise.all([
    getStatusCounts(project.id),
    getRecentActivity(project.id),
  ])

  return res.json({ statusCounts, recentActivity })
})

projectsRouter.post('/', async (req, res, next) => {
  try {
    const input = createProjectSchema.parse(req.body)
    return res.status(201).json(await createProject({ ...input, ownerId: req.user!.sub }))
  } catch (err) {
    return next(err)
  }
})

projectsRouter.post('/:id/ask', async (req, res, next) => {
  try {
    const project = await getProjectForUser(req.params.id, req.user!.sub)
    if (!project) return res.status(404).json({ message: 'Projekt nie istnieje' })
    const { question } = askProjectSchema.parse(req.body)
    const tasks = await listTasks(project.id)
    const answer = await answerProjectQuestion(question, {
      projectName: project.name,
      tasks: tasks.map((task) => ({
        title: task.title,
        status: task.status,
        priority: task.priority,
      })),
    })
    return res.json({ answer })
  } catch (err) {
    return next(err)
  }
})

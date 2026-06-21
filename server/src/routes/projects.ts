import { Router } from 'express'
import { z } from 'zod'
import { requireAuth } from '../middleware/requireAuth.js'
import { getRecentActivity, getStatusCounts } from '../services/activityService.js'
import {
  createProject,
  getProjectForUser,
  listProjectsForUser,
} from '../services/projectsService.js'

export const projectsRouter = Router()

projectsRouter.use(requireAuth)

const createProjectSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
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

import type { Prisma, TaskPriority, TaskStatus } from '@prisma/client'
import { prisma } from '../db/client.js'

export function listTasks(projectId?: string) {
  return prisma.task.findMany({
    where: projectId ? { projectId } : undefined,
    orderBy: { createdAt: 'asc' },
  })
}

export function getTask(id: string) {
  return prisma.task.findUnique({ where: { id } })
}

export function createTask(input: {
  projectId: string
  title: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
}) {
  return prisma.task.create({
    data: {
      projectId: input.projectId,
      title: input.title,
      description: input.description ?? '',
      status: input.status ?? 'TODO',
      priority: input.priority ?? 'MEDIUM',
    },
  })
}

export async function updateTask(id: string, changes: Prisma.TaskUpdateInput) {
  try {
    return await prisma.task.update({ where: { id }, data: changes })
  } catch {
    return null
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

export function listComments(taskId: string) {
  return prisma.comment.findMany({
    where: { taskId },
    orderBy: { createdAt: 'asc' },
    include: { author: { select: { id: true, email: true, name: true } } },
  })
}

export function createComment(input: { taskId: string; authorId: string; content: string }) {
  return prisma.comment.create({
    data: input,
    include: { author: { select: { id: true, email: true, name: true } } },
  })
}

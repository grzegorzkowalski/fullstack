import type { Prisma } from '@prisma/client'
import { prisma } from '../db/client.js'

export function logActivity(taskId: string, action: string, payload?: Prisma.InputJsonValue) {
  return prisma.activityLog.create({
    data: {
      taskId,
      action,
      payload,
    },
  })
}

export async function getStatusCounts(projectId: string) {
  const grouped = await prisma.task.groupBy({
    by: ['status'],
    where: { projectId },
    _count: { _all: true },
  })
  const counts: Record<string, number> = { TODO: 0, IN_PROGRESS: 0, DONE: 0 }

  for (const row of grouped) {
    counts[row.status] = row._count._all
  }

  return counts
}

export function getRecentActivity(projectId: string, limit = 10) {
  return prisma.activityLog.findMany({
    where: { task: { projectId } },
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: { task: { select: { id: true, title: true } } },
  })
}

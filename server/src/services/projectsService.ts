import { prisma } from '../db/client.js'

export function listProjectsForUser(ownerId: string) {
  return prisma.project.findMany({
    where: { ownerId },
    orderBy: { createdAt: 'asc' },
  })
}

export function getProjectForUser(id: string, ownerId: string) {
  return prisma.project.findFirst({
    where: { id, ownerId },
  })
}

export function createProject(input: { ownerId: string; name: string; description?: string }) {
  return prisma.project.create({
    data: {
      ownerId: input.ownerId,
      name: input.name,
      description: input.description ?? '',
    },
  })
}

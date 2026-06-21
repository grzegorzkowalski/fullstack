import { prisma } from '../db/client.js'

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } })
}

export function createUser(input: { email: string; name: string; passwordHash: string }) {
  return prisma.user.create({
    data: {
      ...input,
      email: input.email.toLowerCase(),
    },
  })
}

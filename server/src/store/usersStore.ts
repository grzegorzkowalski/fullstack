import { randomUUID } from 'node:crypto'
import type { User } from '../types/index.js'

const users: User[] = []

export function findUserByEmail(email: string): User | undefined {
  return users.find((user) => user.email === email.toLowerCase())
}

export function createUser(input: Omit<User, 'id'>): User {
  const user: User = {
    ...input,
    id: randomUUID(),
    email: input.email.toLowerCase(),
  }
  users.push(user)
  return user
}

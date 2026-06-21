import request from 'supertest'
import { app } from '../app'
import { signToken } from '../auth/jwt'

jest.mock('../db/client', () => ({
  prisma: {
    task: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 't1',
          projectId: 'p1',
          title: 'Test',
          description: '',
          status: 'TODO',
          priority: 'MEDIUM',
        },
      ]),
      findUnique: jest.fn().mockResolvedValue(null),
    },
    comment: {
      findMany: jest.fn().mockResolvedValue([]),
      create: jest.fn(),
    },
    project: {
      findMany: jest.fn().mockResolvedValue([]),
      findFirst: jest.fn().mockResolvedValue(null),
    },
    user: {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
    },
  },
}))

const token = signToken({ sub: 'u1', email: 'demo@example.com', name: 'Demo' })

describe('tasksRouter', () => {
  it('wymaga tokenu dla listy zadan', async () => {
    await request(app).get('/tasks').expect(401)
  })

  it('zwraca liste zadan z poprawnym tokenem', async () => {
    const response = await request(app)
      .get('/tasks?projectId=p1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body).toHaveLength(1)
    expect(response.body[0].title).toBe('Test')
  })
})

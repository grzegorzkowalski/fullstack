import { signToken, verifyToken } from './jwt'

describe('jwt', () => {
  it('podpisuje i weryfikuje token', () => {
    const payload = { sub: 'u1', email: 'demo@example.com', name: 'Demo' }
    const token = signToken(payload)

    expect(verifyToken(token)).toMatchObject(payload)
  })
})

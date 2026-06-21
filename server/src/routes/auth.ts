import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { signToken } from '../auth/jwt.js'
import { createUser, findUserByEmail } from '../services/usersService.js'
import { loginSchema, registerSchema } from '../validation/authSchemas.js'

export const authRouter = Router()

function toAuthResponse(user: { id: string; email: string; name: string }) {
  const token = signToken({ sub: user.id, email: user.email, name: user.name })
  return { token, user: { id: user.id, email: user.email, name: user.name } }
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const { email, name, password } = registerSchema.parse(req.body)

    if (await findUserByEmail(email)) {
      return res.status(409).json({ message: 'Uzytkownik z tym adresem e-mail juz istnieje' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await createUser({ email, name, passwordHash })
    return res.status(201).json(toAuthResponse(user))
  } catch (err) {
    return next(err)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const user = await findUserByEmail(email)

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Nieprawidlowy e-mail lub haslo' })
    }

    return res.json(toAuthResponse(user))
  } catch (err) {
    return next(err)
  }
})

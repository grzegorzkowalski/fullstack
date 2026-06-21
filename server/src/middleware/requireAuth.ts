import type { NextFunction, Request, Response } from 'express'
import { verifyToken, type JwtPayload } from '../auth/jwt.js'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Brak tokenu autoryzacyjnego' })
  }

  try {
    req.user = verifyToken(header.slice('Bearer '.length))
    return next()
  } catch {
    return res.status(401).json({ message: 'Token jest nieprawidlowy lub wygasl' })
  }
}

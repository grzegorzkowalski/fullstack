import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { AiNotConfiguredError } from '../services/aiService.js'

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AiNotConfiguredError) {
    res.status(503).json({ message: err.message })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      message: 'Blad walidacji danych wejsciowych',
      issues: err.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    })
    return
  }

  console.error(err)
  res.status(500).json({ message: 'Wewnetrzny blad serwera' })
}

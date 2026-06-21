import cors from 'cors'
import express from 'express'
import { errorHandler } from './middleware/errorHandler.js'
import { authRouter } from './routes/auth.js'
import { tasksRouter } from './routes/tasks.js'

const app = express()
const PORT = process.env.PORT ?? 4000

app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/auth', authRouter)
app.use('/tasks', tasksRouter)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`DevTrack API dziala na http://localhost:${PORT}`)
})

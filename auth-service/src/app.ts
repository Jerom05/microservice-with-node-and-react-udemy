import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import 'express-async-errors'

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter
} from './routes'
import { errorHandler } from './middlewares'
import { NotFoundError } from './errors'

dotenv.config()

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Auth-service')
})
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})
app.use(errorHandler)

export { app }

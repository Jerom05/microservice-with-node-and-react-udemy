import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import 'express-async-errors'

import { errorHandler, NotFoundError, currentUser } from '@caltickets/common'
import {
  newOrderRouter,
  indexOrderRouter,
  deleteOrderRouter,
  showOrderRouter
} from './routes'

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

app.use(currentUser)
app.get('/', (req: Request, res: Response) => {
  res.send('Tickets-service')
})
app.use(newOrderRouter)
app.use(indexOrderRouter)
app.use(deleteOrderRouter)
app.use(showOrderRouter)
app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})
app.use(errorHandler)

export { app }

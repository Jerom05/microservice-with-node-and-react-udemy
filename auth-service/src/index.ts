import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter
} from './routes'

dotenv.config()

const app = express()
app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.get('/', (req: Request, res: Response) => {
  res.send('Auth-service')
})
app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect(process.env.db_url!)
    console.log('Connected to MongoDb')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!')
  })
}

start()

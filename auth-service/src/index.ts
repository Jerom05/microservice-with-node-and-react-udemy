import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import express, { Request, Response } from 'express'
import 'express-async-errors'

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter
} from './routes'

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

const port = 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})

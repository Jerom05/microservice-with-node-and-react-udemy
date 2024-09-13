import express, { Request, Response } from 'express'

import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter
} from './routes'

const app = express()

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

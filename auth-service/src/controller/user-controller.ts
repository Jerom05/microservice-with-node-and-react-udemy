import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'

export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body || {}

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new Error('User already exists')
  }
  const user = User.build({ email, password })
  await user.save()

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY!
  )

  req.session = { jwt: token }

  res.status(200).send({ user })
}

import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '../middlewares'
import { signin } from '../controller/user-controller'

const router = express.Router()

const validations = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('You must supply a password')
]

router.post('/api/users/signin', validations, validateRequest, signin)

export { router }

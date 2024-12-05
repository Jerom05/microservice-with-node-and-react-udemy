import express from 'express'
import { body } from 'express-validator'

import { validateRequest } from '@caltickets/common'
import { signup } from '../controller/user-controller'

const router = express.Router()

const validations = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
]

router.post('/api/users/signup', validations, validateRequest, signup)

export { router }

import express from 'express'
import { signup } from '../controller/user-controller'

const router = express.Router()

router.get('/api/users/signup', signup)

export { router }

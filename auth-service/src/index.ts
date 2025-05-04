import mongoose from 'mongoose'

import { app } from './app'

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

  console.log('logging from auth service.')

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!')
  })
}

start()

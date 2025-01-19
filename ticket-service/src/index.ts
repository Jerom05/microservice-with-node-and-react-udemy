import mongoose from 'mongoose'

import { natsWrapper } from './nats-wrapper'
import { app } from './app'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect(process.env.db_url!)
    console.log(process.env.db_url)
    console.log('Connected to MongoDb')

    await natsWrapper.connect('ticketing', '1', 'http://nats-srv:4222')
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })
    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!')
  })
}

start()

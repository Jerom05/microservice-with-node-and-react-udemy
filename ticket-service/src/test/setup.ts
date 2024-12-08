import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'
import mongoose from 'mongoose'
import { afterAll, beforeAll, beforeEach } from '@jest/globals'

import { app } from '../app'

declare global {
  function signin(): Promise<string[]>
}

let mongoServer: any

process.env.JWT_KEY = 'TEST_KEY'

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const mongoUri = mongoServer.getUri()

  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections()
    for (const collection of collections) {
      await collection.deleteMany({})
    }
  }
})

afterAll(async () => {
  await mongoServer.stop()
  await mongoose.connection.close()
})

global.signin = async () => {
  const email = 'test@test.com'
  const password = 'password'

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(200)

  const cookie = response.get('Set-Cookie')
  if (!cookie) throw new Error('Cookie not set')

  return cookie
}

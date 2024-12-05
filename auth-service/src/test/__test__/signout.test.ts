import request from 'supertest'
import { app } from '../../app'
import { it } from '@jest/globals'

it('clears the cookie after signing out', async () => {
  return request(app).post('/api/users/signout').send({}).expect(200)
})

import { useState } from 'react'
import { useRouter } from 'next/router'
import useRequest from '../../app/hooks/use-request'
import '../../app/globals.css'

const Signin = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => router.push('/'),
  })
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await doRequest()
  }

  return (
    <div className="container m-5">
      <h1 className="text-2xl font-bold mb-5">Sign In</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-5">
          <p className="text-sm mb-1">Email Address</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="form-group mb-5">
          <p className="text-sm mb-1">Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        {errors}
        <div className="form-group mb-5">
          <button className="bg-blue-500 text-white rounded-md p-2">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signin

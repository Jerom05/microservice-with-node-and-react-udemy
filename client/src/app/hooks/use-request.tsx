import axios, { AxiosError } from 'axios'
import { useState } from 'react'

interface RequestProps {
  url: string
  method: 'get' | 'post' | 'put' | 'delete'
  body: object
}

interface ErrorResponse {
  errors: Array<{ message: string }>
}

const useRequest = ({ url, method, body }: RequestProps) => {
  const [errors, setErrors] = useState<React.ReactNode | null>(null)

  const doRequest = async () => {
    try {
      setErrors(null)
      const response = await axios[method](url, body)
      return response.data
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data) {
        const errorData = err.response.data as ErrorResponse
        setErrors(
          <div className="bg-red-100 border border-red-400 text-red-500 mt-2 mb-2 rounded-md p-3">
            <h4>Oops...</h4>
            <ul className="list-none">
              {errorData.errors.map((error) => (
                <li key={error.message}>{error.message}</li>
              ))}
            </ul>
          </div>,
        )
      }
    }
  }

  return { doRequest, errors }
}

export default useRequest

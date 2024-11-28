import axios from 'axios'
import { NextApiRequest } from 'next/types'

const buildClient = ({ req }: { req: NextApiRequest }) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    })
  } else {
    return axios.create({
      baseURL: '/',
    })
  }
}

export default buildClient

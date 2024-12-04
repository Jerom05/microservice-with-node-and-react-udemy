import buildClient from '@/app/api/build-client'
import { NextApiRequest } from 'next'
import { GetServerSideProps } from 'next'

interface HomeProps {
  currentUser: object | null
}

const Home = ({ currentUser }: HomeProps) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const client = buildClient({ req: context.req as NextApiRequest })
    const { data } = await client.get('/api/users/currentuser')

    return { props: data }
  } catch (error) {
    console.log({ error })
    return { props: {} }
  }
}

export default Home

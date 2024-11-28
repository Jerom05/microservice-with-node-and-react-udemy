import buildClient from '@/app/api/build-client'
import { NextApiRequest } from 'next'
import { GetServerSideProps } from 'next'

interface HomeProps {
  currentUser: object | null
}

const Home = ({ currentUser }: HomeProps) => {
  console.log({ currentUser })
  return (
    <div>
      <h1>Home page!</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const client = buildClient({ req: context.req as NextApiRequest })
    const response = await client.get('/api/users/currentuser')

    return { props: { currentUser: response.data } }
  } catch (error) {
    console.log({ error })
    return { props: {} }
  }
}

export default Home

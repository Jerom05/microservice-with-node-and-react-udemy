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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    return { props: {} }
  } catch (error) {
    console.log({ error })
    return { props: {} }
  }
}

export default Home

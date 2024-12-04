import { NextApiRequest } from 'next'
import type { AppProps, AppContext } from 'next/app'
import buildClient from '@/app/api/build-client'
import Header from '@/components/header'
import '../app/globals.css'

const App = ({
  Component,
  pageProps,
  currentUser,
}: AppProps & { currentUser: object }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <hr />
      <Component {...pageProps} />
    </div>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient({ req: appContext.ctx.req as NextApiRequest })
  const { data } = await client.get('/api/users/currentuser')
  return data
}

export default App

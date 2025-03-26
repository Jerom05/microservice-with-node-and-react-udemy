import { useEffect, useState } from 'react'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
} from 'next'
import buildClient from '@/app/api/build-client'

const ShowOrder = ({ order }: { order: { expiresAt: string } }) => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft =
        new Date(order.expiresAt as string).getTime() - new Date().getTime()
      setTimeLeft(Math.floor(msLeft / 1000))
    }

    findTimeLeft()
    const timeId = setInterval(findTimeLeft, 1000)

    return () => {
      clearInterval(timeId)
    }
  }, [order])

  if (timeLeft < 0) {
    return <div>Order Expired</div>
  }

  return (
    <div>
      <h1>Time left to pay {timeLeft} seconds</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { orderId } = context.params as { orderId: string }

  const client = buildClient({ req: context.req as NextApiRequest })
  const { data: order } = await client.get(`/api/orders/${orderId}`)

  return { props: { order } }
}

export default ShowOrder

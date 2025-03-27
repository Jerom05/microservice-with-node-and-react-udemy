import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextApiRequest } from 'next'
import buildClient from '@/app/api/build-client'
import Link from 'next/link'

interface Order {
  id: string
  status: string
  ticket: {
    title: string
    price: number
  }
}

const OrdersIndex = ({ orders }: { orders: Order[] }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'created':
        return 'bg-blue-100 text-blue-800'
      case 'awaiting:payment':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            You don&apos;t have any orders yet.
          </p>
          <Link
            href="/tickets"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Browse tickets
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {order.ticket.title}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      ${order.ticket.price.toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = buildClient({ req: context.req as NextApiRequest })
    const { data } = await client.get('/api/orders')
    return {
      props: {
        orders: data as Order[],
      },
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
    return {
      props: {
        orders: [],
      },
    }
  }
}

export default OrdersIndex

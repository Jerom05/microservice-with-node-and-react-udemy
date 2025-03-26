import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextApiRequest } from 'next'
import buildClient from '@/app/api/build-client'
import useRequest from '@/app/hooks/use-request'
import { useRouter } from 'next/router'

interface Ticket {
  id: string
  title: string
  price: number
  userId?: string
}

interface TicketShowProps {
  ticket: Ticket | null
}

const TicketShow = ({ ticket }: TicketShowProps) => {
  const router = useRouter()
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket?.id,
    },
    onSuccess: (order) => {
      if (typeof order === 'object' && 'id' in order) {
        router.push(`/orders/${order.id}`)
      }
    },
  })

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full mx-4 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ticket Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The ticket you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200"
          >
            Browse Available Tickets
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {ticket.title}
          </h1>
          <div className="flex items-center text-gray-500">
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Available now</span>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price:</span>
            <span className="text-2xl font-bold text-blue-600">
              ${ticket.price.toFixed(2)}
            </span>
          </div>
        </div>

        {errors && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md border border-red-100">
            {errors}
          </div>
        )}

        <button
          onClick={() => doRequest()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition duration-200 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Purchase Ticket
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Secure checkout • Instant confirmation</p>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = buildClient({ req: context.req as NextApiRequest })
    const { ticketId } = context.params as { ticketId: string }

    const { data } = await client.get(`/api/tickets/${ticketId}`)

    return {
      props: {
        ticket: data as Ticket,
      },
    }
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return {
      props: {
        ticket: null,
      },
    }
  }
}

export default TicketShow

import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { NextApiRequest } from 'next'
import buildClient from '@/app/api/build-client'
import Link from 'next/link'

interface Ticket {
  id: string
  title: string
  price: number
}

interface HomeProps {
  currentUser: object | null
  tickets: Ticket[]
}

const Home = ({ currentUser, tickets }: HomeProps) => {
  console.log(currentUser)

  const ticketList = tickets.map((ticket: Ticket) => {
    return (
      <tr key={ticket.id}>
        <td className="px-6 py-4 whitespace-nowrap">{ticket.title}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          ${ticket.price.toFixed(2)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link
            href={`/tickets/${ticket.id}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            View
          </Link>
        </td>
      </tr>
    )
  })

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Available Tickets
        </h1>
        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets found.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700 uppercase text-sm tracking-wider">
                  <th className="px-6 py-3 border-b">Title</th>
                  <th className="px-6 py-3 border-b">Price</th>
                  <th className="px-6 py-3 border-b">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">{ticketList}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  try {
    const client = buildClient({ req: context.req as NextApiRequest })
    const { data } = await client.get('/api/tickets')
    return {
      props: {
        tickets: data as Ticket[],
      },
    }
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return {
      props: {
        tickets: [],
      },
    }
  }
}

export default Home

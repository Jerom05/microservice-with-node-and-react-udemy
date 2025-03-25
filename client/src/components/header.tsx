import Link from 'next/link'

const Header = ({ currentUser }: { currentUser: object | null }) => {
  const links = [
    !currentUser && { label: 'Sign Up', href: '/auth/signup' },
    !currentUser && { label: 'Sign In', href: '/auth/signin' },
    currentUser && { label: 'Sign Out', href: '/auth/signout' },
  ]
    .filter((linkConfig): linkConfig is { label: string; href: string } =>
      Boolean(linkConfig),
    )
    .map(({ label, href }) => {
      return (
        <li key={href} className="ml-4">
          <Link
            href={href}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {label}
          </Link>
        </li>
      )
    })

  return (
    <nav className="bg-gray-100 p-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-bold text-gray-800 hover:text-gray-600"
      >
        GitTix
      </Link>

      <div className="flex items-center">
        <ul className="flex items-center">{links}</ul>
      </div>
    </nav>
  )
}

export default Header

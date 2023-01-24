import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="p-4 rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 bg-gray-800">
      <span className="text-sm  sm:text-center text-gray-400">2023 <a href="https://kchub.net" className="hover:underline">KCH</a>. Krunker Competitive Hub
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-400 sm:mt-0">
        <li>
          <Link href="/privacy" className='mr-4 hover:underline md:mr-6'>
            Privacy Policy
          </Link>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
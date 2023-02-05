import { NextPage } from 'next'
import React from 'react'
import { convertTime } from '../../utils/convertTime'
import { motion } from 'framer-motion'
import { Organization } from '@prisma/client'
import Link from 'next/link'
import { Roboto_Condensed } from '@next/font/google'
import krunkerImage from '../../../public/krunkeresportssquare.jpg'

interface TournamentCardProps {
  name: string
  startDate: string
  region: string
  type: string
  description: string
  id: string
  organization: Organization | null
  signupsClosed: boolean
  teamsLength: number
}

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  weight: '700'
})

const TournamentCard: NextPage<TournamentCardProps> = ({name, startDate, region, type, description, id, organization, signupsClosed, teamsLength}) => {
  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0}} exit={{ opacity: 0}}>
      <div className="p-6 max-w-6xl lg:mx-0 rounded-md shadow-xl dark:bg-gray-800 bg-white cursor-pointer relative">
      <Link href={`/tournaments/${id}`}>
          <div className='flex justify-start gap-8'>
            <div className='flex items-center min-w-fit'>
              <img
                src={krunkerImage.src}
                alt="Krunker Esports Logo"
                className='rounded-full md:w-32 md:h-32 hidden md:block'
              />
            </div>
            <div className='w-full'>
              <div className="flex items-center justify-between">
                <h1 className="dark:text-gray-200 text-gray-600 font-medium">{organization?.name}</h1>
                <div className='flex flex-col sm:flex-row gap-4 '>
                  <span className="px-2 py-1 font-semibold hidden sm:block rounded-sm dark:text-gray-100 dark:bg-gray-700 text-gray-500 bg-gray-200">
                    {`${teamsLength} Teams`}
                  </span>
                  <span className="px-2 py-1 font-semibold rounded-sm dark:text-gray-100 dark:bg-gray-700 text-gray-500 bg-gray-200">
                    {`${region} | ${type}`}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className='flex justify-between'>
                  <h1
                    className="text-2xl font-semibold dark:text-gray-200 dark:hover:text-gray-100 text-gray-600 hover:text-gray-500"
                    >
                    {name}
                  </h1>
                </div>
                <p className="mt-2 dark:text-gray-300 text-gray-700 line-clamp-2 max-w-xl break-words">
                  {description}
                </p>
              </div>
              <div className="sm:flex sm:items-center sm:justify-between sm:mt-4 hidden">
                <div className="flex items-center">
                  {!signupsClosed ?
                  <Link href={`/tournaments/signups/${id}`}>
                    <span className={`${roboto.className} px-3 py-2 border text-gray-900 dark:text-gray-200 dark:border-gray-400 border-black tracking-wide hover:border-transparent dark:hover:bg-gray-700 dark:hover:border-transparent hover:bg-[#FFD449]/40 transition-all duration-500`}>
                      SIGNUPS
                    </span>
                  </Link>
                  :
                  <div />
                }
                <div className={`${!signupsClosed ? "ml-2" : "ml-0"} flex items-center`}>
                  <Link href={`/tournaments/${id}/teams`}>
                    <span className={`${roboto.className} px-3 py-2 border text-gray-900 dark:text-gray-200 dark:border-gray-400 border-black tracking-wide hover:border-transparent dark:hover:bg-gray-700 dark:hover:border-transparent hover:bg-[#FFD449]/40 transition-all duration-500`}>
                      TEAMS
                    </span>
                  </Link>
                </div>
                </div>
                <div className="flex items-center mt-4">
                  <div className="flex items-center">
                    <span className="dark:text-gray-200 text-gray-600 font-medium">
                      {convertTime(startDate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Link>
      </div>
    </motion.div>

  )
}

export default TournamentCard
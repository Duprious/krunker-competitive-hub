import { NextPage } from 'next'
import React from 'react'
import { convertTime } from '../../utils/convertTime'
import { motion } from 'framer-motion'
import Link from 'next/link'
import krunkerImage from '../../../public/krunkeresportssquare.jpg'

interface TournamentCardProps {
  name: string
  startDate: string
  region: string
  type: string
  description: string
  hostName: string
  id: string
  organization: string
  teamsLength: number
  ended: boolean
}

const AdminTournamentCard: NextPage<TournamentCardProps> = ({name, startDate, region, type, hostName, description, ended, id, organization, teamsLength}) => {
  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0}} exit={{ opacity: 0}}>
      <Link href={`/admin/organizations/${organization}/tournaments/${id}`}>
        <div className="p-6 max-w-6xl lg:mx-0 rounded-md shadow-xl dark:bg-gray-800 bg-white cursor-pointer relative">
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
                <h1 className="dark:text-gray-200 text-gray-600 font-medium">{organization}</h1>
                <div className='flex flex-col sm:flex-row gap-4 '>
                  <span className="px-2 py-1 font-semibold hidden sm:block rounded-sm dark:text-gray-100 dark:bg-gray-700 text-gray-500 bg-gray-200">
                    {ended 
                    ? <span className='text-red-400'>ENDED</span>
                    : <span>{teamsLength} Teams</span>
                    }
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
                <div className="flex items-center mt-4 sm:mt-0">
                  <div className="flex items-center">
                    <span className="dark:text-gray-200 text-gray-600 font-medium">
                      {hostName}
                    </span>
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
        </div>
      </Link>
    </motion.div>
  )
}

export default AdminTournamentCard
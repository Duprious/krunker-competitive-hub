import { NextPage } from 'next'
import React from 'react'
import { convertTime } from '../../utils/convertTime'
import { motion } from 'framer-motion'
import { Organization } from '@prisma/client'
import Link from 'next/link'

interface TournamentCardProps {
  name: string
  startDate: string
  region: string
  type: string
  description: string
  id: string
  organization: Organization | null
  signupsClosed: boolean
}

const TournamentCard: NextPage<TournamentCardProps> = ({name, startDate, region, type, description, id, organization, signupsClosed}) => {
  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0}} exit={{ opacity: 0}}>
      <Link href={`/tournaments/${id}`}>
        <div className="p-6 max-w-sm lg:mx-0 hover:shadow-xl transition duration-30 rounded-lg border shadow-md bg-gray-800 border-gray-700 cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light text-gray-400 max-w-[135px]">
              {convertTime(startDate)}
            </span>
            <span className="px-2 py-1 font-semibold text-gray-100 rounded-full bg-gray-700">
              {`${region} / ${type}`} 
            </span>
          </div>
          <div className="mt-2">
            <div className='flex justify-between relative'>
              <h1
                className="text-2xl font-semibold text-gray-200 hover:text-gray-100"
                >
                {name}
              </h1>
            </div>
            <p className="mt-2 text-gray-300 line-clamp-3 leading-7 min-h-[5.25em]">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              {!signupsClosed ?
              <Link href={`/tournaments/signups/${id}`}>
                
                  <span className="px-3 py-2 font-semibold text-white rounded-full bg-green-400 hover:bg-green-400/60 transition duration-150">
                    Signups
                  </span>
              </Link>
              :
              <div />
            }
            <div className="flex items-center ml-4">
              <Link href={`/tournaments/${id}/teams`}>
                <span className="px-3 py-2 font-semibold text-white rounded-full bg-blue-400 hover:bg-blue-400/60 transition duration-150">
                  Teams
                </span>
              </Link>
            </div>
            
            </div>
            <div className="flex items-end">
              <h1 className="text-gray-200 font-medium">{organization?.name}</h1>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>

  )
}

export default TournamentCard
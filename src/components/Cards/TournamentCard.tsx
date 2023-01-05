import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { convertTime } from '../../utils/convertTime'
import { motion } from 'framer-motion'

interface TournamentCardProps {
  name: string
  startDate: string
  region: string
  type: string
  description: string
  hostName: string
  id: string
}

const TournamentCard: NextPage<TournamentCardProps> = ({name, startDate, region, type, description, hostName, id}) => {
  const router = useRouter()
  

  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0}} exit={{ opacity: 0}}>
      <div onClick={() => router.push(`/tournaments/${id}`)} className="p-6 max-w-sm hover:shadow-xl transition duration-30 rounded-lg border shadow-md bg-gray-800 border-gray-700 cursor-pointer">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-400 max-w-[135px]">
            {convertTime(startDate)}
          </span>
          <span className="px-2 py-1 font-semibold text-gray-100 rounded-full bg-gray-700">
            {`${region} / ${type}`} 
          </span>
        </div>
        <div className="mt-2">
          <div className='flex justify-between'>
            <h1
              className="text-2xl font-semibold text-gray-200 hover:text-gray-100"
              >
              {name}
            </h1>
          </div>
          <p className="mt-2 text-gray-300 break-words">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-end mt-4">
          <div className="flex items-end">
            <h1 className="text-gray-200">Host: <span className='font-medium'>{hostName}</span></h1>
          </div>
        </div>
      </div>
    </motion.div>

  )
}

export default TournamentCard
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { convertTime } from '../../utils/convertTime'
import { motion } from 'framer-motion'

interface AdminTournamentCardProps {
  name: string
  startDate: string
  region: string
  type: string
  description: string
  hostName: string
  id: string
  organization: string
  ended: boolean
}

const AdminTournamentCard: NextPage<AdminTournamentCardProps> = ({name, startDate, region, type, description, hostName, id, organization, ended}) => {
  const router = useRouter()
  

  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0}} exit={{ opacity: 0}}>
      <div onClick={() => router.push(`/admin/organizations/${organization}/tournaments/${id}`)} className="p-6 max-w-sm hover:shadow-xl transition duration-30 rounded-lg border shadow-md bg-gray-800 border-gray-700 cursor-pointer">
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
        <div className="flex items-center mt-4 justify-between">
          {ended ?
          <div className="flex items-center">
            <h1 className='text-base font-semibold text-red-400'>Ended</h1>
          </div>
          :  
          <div className="flex items-center">
            <h1 className='text-base font-semibold text-green-400'>Ongoing</h1>
          </div>
          }
          <div className="flex items-end">
            <h1 className="text-gray-200">Host: <span className='font-medium'>{hostName}</span></h1>
          </div>
        </div>
      </div>
    </motion.div>

  )
}

export default AdminTournamentCard
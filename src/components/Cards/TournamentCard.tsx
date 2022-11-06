import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { convertTime } from '../../utils/convertTime'

interface TournamentCardProps {
  slug: string
  name: string
  startDate: string
  region: string
  type: string
  description: string
}

const TournamentCard: NextPage<TournamentCardProps> = ({name, startDate, region, type, description, slug}) => {
  const router = useRouter()

  return (
    <div onClick={() => router.push(`/tournaments/${slug}`)} className="p-6 max-w-sm hover:shadow-xl transition duration-30 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-500 dark:text-gray-400">
          {convertTime(startDate)}
        </span>
        <span className="px-2 py-1 font-semibold text-gray-100 bg-gray-600 rounded-full dark:bg-gray-700">
          {`${region} / ${type}`} 
        </span>
      </div>
      <div className="mt-2">
        <a
          href="#"
          className="text-2xl text-gray-700 font-semibold hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-100"
        >
          {name}
        </a>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>

  )
}

export default TournamentCard
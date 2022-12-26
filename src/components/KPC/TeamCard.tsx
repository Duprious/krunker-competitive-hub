import { NextPage } from 'next'
import React from 'react'

interface TeamCardProps {
  teamName: string,
  discordPlayerOne: string,
  discordPlayerTwo: string,
  ignPlayerOne: string,
  ignPlayerTwo: string,
  captain: string,
}


const TeamCard: NextPage<TeamCardProps> = ({teamName, captain, discordPlayerOne, discordPlayerTwo, ignPlayerOne, ignPlayerTwo}) => {
  return (
    <div className="p-6 max-w-sm hover:shadow-xl transition duration-30 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      <div className="mt-2">
        <div className='flex justify-between'>
          <h1
            className="text-2xl text-gray-700 font-semibold hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-100"
            >
            {teamName}
          </h1>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-300 break-words">
          <span className='font-semibold'>Player 1: </span>{`${discordPlayerOne} | ${ignPlayerOne}`}
        </p>
        <p className='text-gray-600 dark:text-gray-300 break-words'>
          <span className='font-semibold'>Player 2: </span> {`${discordPlayerTwo} | ${ignPlayerTwo}`}
        </p>
      </div>
      <div className="flex items-center justify-end mt-4">
        <div className="flex items-end">
          <h1 className="text-gray-700 dark:text-gray-200">Captain: <span className='font-medium'>{captain == "P1" ? `${discordPlayerOne}` : `${discordPlayerTwo}`}</span></h1>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
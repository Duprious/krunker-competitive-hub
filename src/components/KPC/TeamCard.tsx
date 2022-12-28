import { NextPage } from 'next'
import React from 'react'
import { useStore } from '../../zustand/store'

interface TeamCardProps {
  teamName: string,
  discordPlayerOne: string,
  discordPlayerTwo: string,
  ignPlayerOne: string,
  ignPlayerTwo: string,
  captain: string,
  id: string,
  validated: boolean
}


const TeamCard: NextPage<TeamCardProps> = ({teamName, captain, discordPlayerOne, discordPlayerTwo, ignPlayerOne, ignPlayerTwo, id, validated}) => {
  const setModalOpen = useStore(state => state.setModalOpen)
  const setCurrentTeam = useStore(state => state.setCurrentTeam)
  
  const handleModalOpen = () => {
    setModalOpen()
    setCurrentTeam(id)
  }

  return (
    <div className="p-6 max-w-sm mx-auto hover:shadow-xl transition duration-30 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-start">
        <h1 className={`${validated ? `bg-green-700` : `bg-red-700/40`} px-3 py-1 font-semibold text-gray-100 rounded-full bg-gray-700`}>
          {validated ? "Validated" : "Not Validated"}
        </h1>
      </div>
      <div className="mt-3">
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
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-gray-700 dark:text-gray-200">Captain: <span className='font-medium'>{captain == "P1" ? `${discordPlayerOne}` : `${discordPlayerTwo}`}</span></h1>
        <button onClick={() => handleModalOpen()} className="px-3 py-1 font-semibold text-gray-100 bg-gray-600 rounded-full dark:bg-red-500/60">
          Options
        </button>
      </div>
    </div>
  )
}

export default TeamCard
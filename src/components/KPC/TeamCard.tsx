import { NextPage } from 'next'
import React from 'react'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

interface TeamCardProps {
  teamName: string,
  discordPlayerOne: string,
  discordPlayerTwo: string,
  discordSub: string,
  ignPlayerOne: string,
  ignPlayerTwo: string,
  ignSub: string,
  captain: string,
  id: string,
  validated: boolean
  teamsMenu: boolean
}


const TeamCard: NextPage<TeamCardProps> = ({teamName, captain, discordPlayerOne, discordPlayerTwo, ignPlayerOne, ignPlayerTwo, id, validated, teamsMenu, discordSub, ignSub}) => {
  const setModalOpen = useStore(state => state.setModalOpen)
  const setCurrentTeam = useStore(state => state.setCurrentTeam)
  const { data: userData } = trpc.user.getUser.useQuery() 
  
  const handleModalOpen = () => {
    setModalOpen()
    setCurrentTeam(id)
  }

  return (
    <div className="p-6 max-w-sm mx-auto hover:shadow-xl transition duration-30rounded-lg bordershadow-md bg-gray-800 border-gray-700">
      <div className="flex items-center justify-start">
        {userData?.role == "ADMIN" &&
          <h1 className={`${validated ? `bg-green-700` : `bg-red-700/40`} px-3 py-1 font-semibold text-gray-100 rounded-full bg-gray-700`}>
            {validated ? "Validated" : "Not Validated"}
          </h1>
        }
      </div>
      <div className="mt-3">
        <div className='flex justify-between'>
          <h1
            className="text-2xl font-semibold text-gray-200 hover:text-gray-100"
            >
            {teamName}
          </h1>
        </div>
        <p className="mt-2 text-gray-300 break-words">
          <span className='font-semibold'>Player 1: </span>{`${discordPlayerOne} | ${ignPlayerOne}`}
        </p>
        <p className='text-gray-300 break-words text-ellipsis min-h-[4.5em] max-h-full'>
          <span className='font-semibold'>Player 2: </span> {`${discordPlayerTwo} | ${ignPlayerTwo}`}
        </p>
        <p className='text-gray-300 break-words'>
          {(discordSub !== "/" && ignSub !== "/") ?
            <span className='font-semibold'>Sub: {`${discordSub} | ${ignSub}`} </span>
          :
            <span className='font-semibold'>No Sub </span>
          }
        </p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-gray-200">Captain: <span className='font-medium'>{captain == "P1" ? `${discordPlayerOne}` : `${discordPlayerTwo}`}</span></h1>
        {(teamsMenu && userData?.role == "ADMIN") &&
          <button onClick={() => handleModalOpen()} className="px-3 py-1 font-semibold text-gray-100 rounded-full bg-red-500/60">
            Options
          </button>
        }
      </div>
    </div>
  )
}

export default TeamCard
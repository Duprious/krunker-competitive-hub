import { Player } from '@prisma/client'
import { NextPage } from 'next'
import React from 'react'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

interface TeamCardProps {
  teamName: string,
  players:  Player[],
  Sub: Player | null;
  captain: string,
  adminMenu: boolean,
  id: string,
  validated: boolean
  tournamentType: string
}


const TeamCard: NextPage<TeamCardProps> = ({teamName, captain, players, Sub, id, validated, tournamentType, adminMenu}) => {
  const setModalOpen = useStore(state => state.setModalOpen)
  const setCurrentTeam = useStore(state => state.setCurrentTeam)
  const { data: userData } = trpc.user.getUser.useQuery() 
  
  const handleModalOpen = () => {
    setModalOpen()
    setCurrentTeam(id)
  }

  return (
    <div className="p-6 max-w-sm mx-auto hover:shadow-xl transition duration-30 rounded-lg bordershadow-md bg-gray-800 border-gray-700">
      <div className="flex items-center justify-start">
        {adminMenu && userData?.role == "ADMIN" &&
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
        {players.map((player, index) => (
          <p className="mt-2 text-gray-300 break-words">
            <span className='font-semibold'>Player {index+1}: </span>{`${player.discordName} | ${player.ign}`}
          </p>
        ))}
        {Sub ?
          <p className="mt-2 text-gray-300 break-words">
            <span className='font-semibold'>Sub: </span>{`${Sub.discordName} | ${Sub.ign}`}
          </p>
        :
          <p className="mt-2 text-gray-300 break-words">
            <span className='font-semibold'>No Sub </span>
          </p>
        }
      </div>
      <div className="flex items-center justify-between mt-4">
        {tournamentType == "2v2" &&
        <h1 className="text-gray-200">Captain: <span className='font-medium'>{captain == "P1" ? `${players[0]?.discordName}` : `${players[1]?.discordName}`}</span></h1>
        }
        {tournamentType == "3v3" &&
        <h1 className="text-gray-200">Captain: <span className='font-medium'>{captain == "P1" ? `${players[0]?.discordName}` : captain == "P2" ? `${players[1]?.discordName}` : `${players[2]?.discordName}`}</span></h1>
        }
        {tournamentType == "4v4" &&
        <h1 className="text-gray-200">Captain: <span className='font-medium'>{captain == "P1" ? `${players[0]?.discordName}` : captain == "P2" ? `${players[1]?.discordName}` : captain == "P3" ? `${players[2]?.discordName}` : `${players[3]?.discordName}`}</span></h1>
        }
        {(adminMenu && userData?.role == "ADMIN") &&
          <button onClick={() => handleModalOpen()} className="px-3 py-1 font-semibold text-gray-100 rounded-full bg-red-500/60">
            Options
          </button>
        }
      </div>
    </div>
  )
}

export default TeamCard
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

const ChangeTeamModal = (props: {tournamentId: string | undefined}) => {
  const changeTeamModalOpen = useStore(state => state.changeTeamModalOpen)
  const toggleChangeTeamModal = useStore(state => state.toggleChangeTeamModal)
  const currentTeam = useStore(state => state.currentTeam)

  const { data: teamData, isLoading: teamDataLoading } = trpc.teamRouter.getTeam.useQuery({ id: currentTeam })
  const { data: tournamentsData } = trpc.tournament.getTournaments.useQuery()
  const playerChangeMutation = trpc.teamRouter.changePlayer.useMutation()
  const removeSubMutation = trpc.teamRouter.playerRemoveSub.useMutation()
  const removeTeamMutation = trpc.teamRouter.playerDeleteTeam.useMutation()
  const utils = trpc.useContext()

  const [currentDiscordName, setCurrentDiscordName] = useState(teamData?.players[0]?.discordName)
  const [currentIGN, setCurrentIGN] = useState(teamData?.players[0]?.ign)
  const [currentID, setCurrentID] = useState(teamData?.players[0]?.id)
  const [changedDiscordName, setChangedDiscordName] = useState("")
  const [changedIGN, setChangedIGN] = useState("")

  const changeSelectPlayer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userArr = e.target.value.split("|")
    const discordName = userArr[0]
    const ign = userArr[1]
    const id = userArr[2]
    
    setCurrentDiscordName(discordName ? discordName : "")
    setCurrentIGN(ign ? ign : "")
    setCurrentID(id ? id : "")
  }

  useEffect(() => {
    setCurrentDiscordName(teamData?.players[0]?.discordName)
    setCurrentIGN(teamData?.players[0]?.ign)
    setCurrentID(teamData?.players[0]?.id)
  }, [teamData])


  const updatePlayer = () => {

    if (changedDiscordName == "" || changedIGN == "") {
      toast.error("Please fill in both fields")
      return
    }

    const currentTournamentDataTeams = tournamentsData?.find(tournament => tournament.id === props.tournamentId)?.teams
    
    if (currentTournamentDataTeams) {
      for (const team of currentTournamentDataTeams) {
        if (team.teamName === teamData?.teamName) continue
        if (team.players.find(player => player.discordName === changedDiscordName) || team.players.find(player => player.ign === changedIGN)) {
          toast.error("One of your players is already registered in another team. Please choose another player.")
          return
        }
      }
    }

    playerChangeMutation.mutateAsync({
      teamId: teamData?.id as string,
      ownerId: teamData?.owner.id as string,
      playerId: currentID as string,
      newDiscordName: changedDiscordName,
      newIGN: changedIGN,
    }, {
      onSuccess: () => {
        toast.success(`Succesfully changed player`)
        setChangedIGN("")
        setChangedDiscordName("")
        utils.invalidate()
        toggleChangeTeamModal()
      },
      onError: () => {
        toast.error(`Could not change player`)
        utils.invalidate()
        toggleChangeTeamModal()
      }
    })
  }

  const removeSub = () => {
    removeSubMutation.mutateAsync({
      ownerId: teamData?.owner.id as string,
      subId: teamData?.Sub?.id as string,
      teamId: teamData?.id as string,
    }, {
      onSuccess: () => {
        toast.success(`Succesfully removed your substitute ${teamData?.Sub?.discordName}`)
        utils.invalidate()
        toggleChangeTeamModal()
      },
      onError: () => {
        toast.error(`Could not remove your substitute ${teamData?.Sub?.discordName}`)
        utils.invalidate()
        toggleChangeTeamModal()
      }
    })
  }

  const removeTeam = () => {
    removeTeamMutation.mutateAsync({
      ownerId: teamData?.owner.id as string,
      teamId: teamData?.id as string
    }, {
      onSuccess: () => {
        toast.success(`Succesfully removed the team`)
        utils.invalidate()
        toggleChangeTeamModal()
      },
      onError: () => {
        toast.error(`Could not remove the team`)
        utils.invalidate()
        toggleChangeTeamModal()
      }
    })
  }

  return (
    <>
      <Transition appear show={changeTeamModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleChangeTeamModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Team
                  </Dialog.Title>
                  <hr className='my-4' />
                  {!teamDataLoading ?
                  <div className='flex flex-col gap-4'>
                    <label htmlFor="changePlayer" className="block mb-2 text-sm font-medium dark:text-white text-gray-800">Select the player to change</label>
                      <select onChange={(e) => changeSelectPlayer(e)} id="changePlayer" className="border sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 bg-stone-100 border-gray-600 placeholder-gray-400 dark:text-white text-gray-800 focus:ring-blue-500 focus:border-blue-500">
                      {teamData?.players.map(player => (
                        <option key={player.id} value={`${player.discordName}|${player.ign}|${player.id}`}>
                          {player.discordName} | {player.ign}
                        </option>
                      ))
                      }
                    </select>
                    <label htmlFor="discordName" className="block text-sm font-medium dark:text-white text-gray-800">Discord Name</label>
                    <input value={changedDiscordName} id="discordName" className='p-2 bg-stone-200 rounded-md' onChange={(e) => setChangedDiscordName(e.target.value)} placeholder={currentDiscordName} />
                    <label htmlFor="ign" className="block text-sm font-medium dark:text-white text-gray-800">Krunker IGN</label>
                    <input value={changedIGN} id="ign" className='p-2 bg-stone-200 rounded-md' onChange={(e) => setChangedIGN(e.target.value)} placeholder={currentIGN} />
                    <button
                      type="button"
                      onClick={() => updatePlayer()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                      Update
                    </button>
                    {
                      teamData?.Sub ?
                      <button
                      type="button"
                      onClick={() => removeSub()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        Remove Sub
                      </button>
                      : null
                    }
                    <button
                      type="button"
                      onClick={() => removeTeam()}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-300 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                      Remove Team
                    </button>
                  </div>
                  : null
                   }

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={toggleChangeTeamModal}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ChangeTeamModal
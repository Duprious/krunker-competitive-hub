import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

const ChangeTeamModal = () => {
  const changeTeamModalOpen = useStore(state => state.changeTeamModalOpen)
  const toggleChangeTeamModal = useStore(state => state.toggleChangeTeamModal)
  const currentTeam = useStore(state => state.currentTeam)
  const { data: teamData } = trpc.teamRouter.getTeam.useQuery({ id: currentTeam })
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
                  <div className='flex flex-col gap-4'>  
                    {/* {teamData?.players.map(player => (
                      <div key={player.id} className='flex flex-row justify-between items-center'>
                        <div className='flex flex-row items-center gap-2'>
                          <div className='flex-col flex'>
                            <h1 className='text-lg font-medium'>{player.discordName} | {player.ign}</h1>
                            <div className='flex flex-row gap-2'>
                              <input type="text"
                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-700 rounded-md"
                                placeholder={player.discordName}
                                />
                              <div className='border-l-2 ' />
                              <input type="text"
                                className="mt-1 p-2 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-700 rounded-md"
                                placeholder={player.ign}
                                />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                    } */}
                    Work in Progress
                  </div>

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
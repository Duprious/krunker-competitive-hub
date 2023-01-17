import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

const TeamOptionsModal = () => {
  const modalOpen = useStore(state => state.modalOpen)
  const closeModal = useStore(state => state.setModalClosed)
  const currentTeam = useStore(state => state.currentTeam)
  const setCurrentTeam = useStore(state => state.setCurrentTeam)
  const { data: teamData } = trpc.teamRouter.getTeam.useQuery({ id: currentTeam })
  const teamRenameMutation = trpc.teamRouter.renameTeam.useMutation()
  const teamRemoveMutation = trpc.teamRouter.removeTeam.useMutation()
  const teamValidateMutation = trpc.teamRouter.validateTeam.useMutation()
  const teamInvalidateMutation = trpc.teamRouter.invalidateTeam.useMutation()
  const utils = trpc.useContext()
  const [newName, setNewName] = useState("")

  const handleRename = async () => {
    await teamRenameMutation.mutateAsync({ id: currentTeam, name: newName }, {
      onSuccess: () => {
        utils.invalidate()
        closeModal()
        setCurrentTeam("")
      }
    })
  }

  const handleClose = () => {
    closeModal()
    setCurrentTeam("")
  }

  const handleRemove = async () => {
    await teamRemoveMutation.mutateAsync({ id: currentTeam }, {
      onSuccess: () => {
        utils.invalidate()
        closeModal()
        setCurrentTeam("")
      }
    })
  }

  const handleValidation = async () => {
    if (teamData?.validated) {
      await teamInvalidateMutation.mutateAsync({ id: currentTeam }, {
        onSuccess: () => {
          utils.invalidate()
          closeModal()
          setCurrentTeam("")
        }
      })
    } else {
      await teamValidateMutation.mutateAsync({ id: currentTeam }, {
        onSuccess: () => {
          utils.invalidate()
          closeModal()
          setCurrentTeam("")
        }
      })
    }
  }

  return (
    <>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    Team Options (In Development)
                  </Dialog.Title>
                  <hr className='my-4' />
                  <div className='flex flex-col gap-4'>
                    <div className="flex gap-4 items-center">
                      <button
                        type="button"
                        onClick={() => handleRemove()}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Remove
                      </button>
                      <h1 className='text-base font-medium'>Remove the team</h1>
                    </div>
                    <div className="flex gap-4 items-center">
                      <button
                        type="button"
                        onClick={() => handleValidation()}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {teamData?.validated ? 'Unvalidate Team' : 'Validate Team'}
                      </button>
                      <h1 className='text-base font-medium'>After checking accounts on Discord</h1>
                    </div>
                    <div className="flex gap-4 items-center">
                      <button
                        type="button"
                        onClick={() => handleRename()}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Rename
                      </button>
                      <input value={newName} onChange={(e) => setNewName(e.target.value)} className='text-base font-medium p-1 rounded-lg border-2 border-gray-400' placeholder='New Name' />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => handleClose()}
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

export default TeamOptionsModal
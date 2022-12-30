import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

const TeamOptionsModal = () => {
  const modalOpen = useStore(state => state.modalOpen)
  const closeModal = useStore(state => state.setModalClosed)
  const currentTeam = useStore(state => state.currentTeam)
  const setCurrentTeam = useStore(state => state.setCurrentTeam)
  const { data: userData } = trpc.user.getUser.useQuery()
  const removeTeamMutation = trpc.kpcTeam.removeTeam.useMutation()
  const renameTeamMutation = trpc.kpcTeam.renameTeam.useMutation()
  const validateTeamMutation = trpc.kpcTeam.validateTeam.useMutation()
  const unvalidateTeamMutation = trpc.kpcTeam.unvalidateTeam.useMutation()
  const getTeam = trpc.kpcTeam.getTeam.useQuery({id: currentTeam})
  const utils = trpc.useContext()
  const [newName, setNewName] = useState("")

  const handleCloseModal = () => {
    closeModal()
    setCurrentTeam('')
  }

  const handleRemove = () => {
    removeTeamMutation.mutateAsync({id: currentTeam, admin: userData?.role === "ADMIN"}, {
      onSuccess: () => {
        handleCloseModal()
        toast.success('Team Removed')
        utils.invalidate()
      }
    })
  }

  const handleRename = () => {
    setNewName("")
    if (newName.length < 1) {
      toast.error('Team Name Must Be At Least 1 Character')
      return
    }
    renameTeamMutation.mutateAsync({id: currentTeam, teamName: newName, admin: userData?.role === "ADMIN"}, {
      onSuccess: () => {
        handleCloseModal()
        toast.success('Team Renamed')
        utils.invalidate()
      }
    })
  }

  const handleValidate = () => {
    if (getTeam.data?.validated) {
      unvalidateTeamMutation.mutateAsync({id: currentTeam, admin: userData?.role === "ADMIN"}, {
        onSuccess: () => {
          handleCloseModal()
          toast.success('Team Unvalidated')
          utils.invalidate()
        }
      })
    } else {
      validateTeamMutation.mutateAsync({id: currentTeam, admin: userData?.role === "ADMIN"}, {
        onSuccess: () => {
          handleCloseModal()
          toast.success('Team Validated')
          utils.invalidate()
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
                        onClick={() => handleValidate()}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {getTeam.data?.validated ? 'Unvalidate Team' : 'Validate Team'}
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
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => handleCloseModal()}
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
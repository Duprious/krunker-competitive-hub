import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

const BracketLinkModal = ({tournamentId}: {
  tournamentId: string
}) => {
  const bracketLinkModalOpen = useStore(state => state.bracketLinkModalOpen)
  const toggleModal = useStore(state => state.toggleBracketLinkModal)
  const addBracketLinkMutation = trpc.tournament.addBracketLink.useMutation()
  const [bracketLink, setBracketLink] = useState('')
  const utils = trpc.useContext()

  const handleClick = () => {
    if (!bracketLink) {
      toast.error('Please enter a bracket link')
      return
    } else if (!bracketLink.includes('challonge')) {
      toast.error('Please enter a valid challonge link')
      return
    }
    addBracketLinkMutation.mutateAsync({tournamentId, bracketLink}, {
      onSuccess: () => {
        toast.success('Bracket Link Added!')
        utils.invalidate()
        toggleModal()
      },
      onError: () => {
        toast.error('Error adding bracket link')
        toggleModal()
      }
    })
  }

  return (
    <>
      <Transition appear show={bracketLinkModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleModal}>
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
                    Add Bracket Link
                  </Dialog.Title>
                  <hr className='my-4' />
                  <div className='flex flex-col gap-4'>
                    <div className="flex gap-4 items-center">
                      <label htmlFor="bracketLink" className="block text-sm font-medium text-gray-700">
                        Bracket Link
                      </label>
                      <input
                        type="text"
                        value={bracketLink}
                        name="bracketLink"
                        id="bracketLink"
                        onChange={(e) => setBracketLink(e.target.value)}
                        className="shadow-sm p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                      {/* Button */}
                      <button
                        type="button"
                        onClick={() => handleClick()}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                      
                    </div>
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

export default BracketLinkModal
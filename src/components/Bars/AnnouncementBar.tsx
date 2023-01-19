import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Marquee from 'react-fast-marquee'
import { useStore } from '../../zustand/store'

const AnnouncementBar = () => {
  const setAnnouncementBarClosed = useStore(state => state.setAnnouncementBarClosed)
  const announcementBarClosed = useStore(state => state.announcementBarClosed)
  return (
    announcementBarClosed ? null :
    // <div className="bg-indigo-600">
    //   <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
    //     <div className="flex flex-wrap items-center justify-between">
    //       <div className="flex w-0 flex-1 items-center">
    //         <span className="flex rounded-lg bg-indigo-800 p-2">
    //           <MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
    //         </span>
    //         <p className="ml-3 truncate font-medium text-white">
    //           <span className="md:hidden">We announced a new product!</span>
    //           <span className="hidden md:inline">Big news! We're excited to announce a brand new product.</span>
    //         </p>
    //       </div>
    //       <div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
    //         <a
    //           href="#"
    //           className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
    //         >
    //           Learn more
    //         </a>
    //       </div>
    //       <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
    //         <button
    //           type="button"
    //           className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
    //         >
    //           <span className="sr-only">Dismiss</span>
    //           <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='bg-gray-900 text-white flex justify-between items-center py-2 text-xs '>
      <Marquee speed={30} gradient={false}>
        <div className='flex items-center mr-8 '>
          <span className='mr-32'>Congrats to Team 2months for winning the KPC 2v2 Tournament</span>
          <span className='mr-32'>Congrats to Team 2months for winning the KPC 2v2 Tournament</span>
          <span className='mr-32'>Congrats to Team 2months for winning the KPC 2v2 Tournament</span>
          <span className='mr-32'>Congrats to Team 2months for winning the KPC 2v2 Tournament</span>
        </div>
      </Marquee>
      <button onClick={setAnnouncementBarClosed}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  )
}

export default AnnouncementBar
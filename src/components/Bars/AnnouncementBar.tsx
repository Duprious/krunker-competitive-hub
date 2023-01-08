import React from 'react'
import Marquee from 'react-fast-marquee'
import { useStore } from '../../zustand/store'

const AnnouncementBar = () => {
  const setAnnouncementBarClosed = useStore(state => state.setAnnouncementBarClosed)
  const announcementBarClosed = useStore(state => state.announcementBarClosed)


  return (
    announcementBarClosed ? null :
    <div className='bg-gray-900 text-white flex justify-between items-center py-2 text-xs '>
      <Marquee speed={30} gradient={false}>
        <div className='flex items-center mr-8 '>
          <span className='mr-32'>Congrats to Gahou for winning the NA $250 3v3 Tournament</span>
          <span className='mr-32'>Congrats to Gahou for winning the NA $250 3v3 Tournament</span>
          <span className='mr-32'>Congrats to Gahou for winning the NA $250 3v3 Tournament</span>
          <span className='mr-32'>Congrats to Gahou for winning the NA $250 3v3 Tournament</span>
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
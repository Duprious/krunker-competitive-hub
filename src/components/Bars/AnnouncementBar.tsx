import React from 'react'
import Marquee from 'react-fast-marquee'

const AnnouncementBar = () => {
  return (
    <div className='bg-gray-900 text-white flex justify-between items-center py-2 text-xs '>
      <Marquee speed={50} gradient={false}>
        <div className='flex items-center mr-8 '>
          <span className='mr-8'>New Website URL: kchub.net</span>
          <span className='mr-8'>New Website URL: kchub.net</span>
          <span className='mr-8'>New Website URL: kchub.net</span>
        </div>
      </Marquee>
      <button>
        test
      </button>
    </div>
  )
}

export default AnnouncementBar
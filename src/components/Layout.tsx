import { NextPage } from 'next'
import React from 'react'
import Footer from './Bars/Footer/Footer'
import Navbar from './Navbar/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: NextPage<LayoutProps> = ({children}) => {
  return (
    <>
      <div className='min-h-screen relative'>
        <div className='pb-[4.25rem]'>
          <Navbar />
          {children}
        </div>
        <footer className='absolute bottom-0 w-full h-[4.25rem]'>
          <Footer />
        </footer>
      </div>
      {/* <div className='absolute bottom-0 w-full h-10'>
        <Footer />
      </div> */}
    </>
  )
}

export default Layout
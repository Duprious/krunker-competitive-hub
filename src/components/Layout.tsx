import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Footer from './Bars/Footer/Footer'
import Navbar from './Navbar/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: NextPage<LayoutProps> = ({children}) => {
  const router = useRouter()
  const activeRoute = router.pathname
  return (
    <>
      <div className='min-h-screen relative'>
        <div className='pb-[4.25rem]'>
          <Navbar
            activeRoute={activeRoute}
          />
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
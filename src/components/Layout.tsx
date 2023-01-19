import { NextPage } from 'next'
import React from 'react'
import Footer from './Bars/Footer/footer'
import Navbar from './Navbar/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: NextPage<LayoutProps> = ({children}) => {
  return (
    <>
      <div className='min-h-screen'>
        <Navbar />
        {children}
      </div>
      <div className='align-bottom'>
        <Footer />
      </div>
    </>
  )
}

export default Layout
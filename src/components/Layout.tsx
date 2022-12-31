import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
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
    </>
  )
}

export default Layout
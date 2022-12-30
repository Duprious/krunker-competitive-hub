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
      <Head>
        <title>Krunker Competitive Hub</title>
        <meta name='description' content='Krunker Competitive Hub' />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://kch.vercel.app' />
        <meta property='og:title' content='Krunker Competitive Hub' />
        <meta property='og:description' content='Krunker Competitive Hub' />
        <meta property='og:image' content='https://i.postimg.cc/zDTZKqsd/krunkeresports.png' />
      </Head>
      <div className='min-h-screen'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
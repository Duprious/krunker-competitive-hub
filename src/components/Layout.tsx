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
        <meta name="description" content="All info on Competitive Krunker here" />
        <meta property="og:url" content="https://kch.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Krunker Competitive Hub" />
        <meta property="og:description" content="All info on Competitive Krunker here" />
        <meta property="og:image" content="https://i.ibb.co/KLzJbYg/JTz-Oke7a-2x.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="kch.vercel.app" />
        <meta property="twitter:url" content="https://kch.vercel.app/" />
        <meta name="twitter:title" content="Krunker Competitive Hub" />
        <meta name="twitter:description" content="All info on Competitive Krunker here" />
        <meta name="twitter:image" content="https://i.ibb.co/KLzJbYg/JTz-Oke7a-2x.png" />

        
      </Head>
      <div className='min-h-screen'>
        <Navbar />
        {children}
      </div>
    </>
  )
}

export default Layout
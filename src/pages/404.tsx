import React from 'react'
import Layout from '../components/Layout'

const FourOhFour = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-100">404 - Page Not Found</h1>
        <p className="text-gray-400">Sorry, we couldn&apos;t find this page.</p>
      </div>
    </Layout>
  )
}

export default FourOhFour
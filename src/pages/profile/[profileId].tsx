import React from 'react'
import Layout from '../../components/Layout'
import Lottie from 'lottie-react'
import UnderConstruction from '../../../public/lottiefiles/under-construction.json'

const ProfilePage = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center pt-24">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Profile Page</h1>
        <p className="text-gray-500 dark:text-gray-400">Under Construction</p>
        <Lottie animationData={UnderConstruction} loop={true} />
      </main>
    </Layout>
  )
}

export default ProfilePage
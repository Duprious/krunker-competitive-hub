import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { motion } from 'framer-motion'

interface PlayerCardProps {
  id: string | null
  name: string | null
  role: string | null
  image: string | undefined
}

const PlayerCard: NextPage<PlayerCardProps> = ({ name, role, image, id}) => {
  const router = useRouter()

  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0 }} exit={{ opacity: 0}}>
      <div onClick={() => router.push(`/player/${id}`)} className="bg-white dark:bg-gray-800 hover:shadow-xl transition duration-30 rounded-lg overflow-hidden cursor-pointer">
        <div className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src={image} alt="" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {name}
              </p>
              <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <p>{role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlayerCard
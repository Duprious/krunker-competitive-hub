import { motion } from 'framer-motion'

import React from 'react'

const LoadingAnim = () => {
  return (
      <div className='flex justify-center items-center h-screen'>
        <motion.div
          className="w-32 h-32 dark:bg-gray-200 bg-stone-400"
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1
          }}
          />
        </div>
  )
}

export default LoadingAnim
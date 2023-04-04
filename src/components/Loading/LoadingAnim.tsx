import { motion } from 'framer-motion'
import krunkerImage from '../../../public/krunkericon.png'

import React from 'react'

const LoadingAnim = () => {
  return (
      <div className='flex justify-center items-center h-screen'>
        <motion.img
          src={krunkerImage.src}
          className="w-32 h-32 bg-transparent"
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
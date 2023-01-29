import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { motion } from 'framer-motion'
import discordImage from '../../../public/discord.png'
import discordImage2 from '../../../public/greendiscord.png'
import discordImage3 from '../../../public/yellowdiscord.png'
import discordImage4 from '../../../public/reddiscord.png'
import discordImage5 from '../../../public/bluediscord.png'
import krunkerEsportsImage from '../../../public/krunkeresports.png'

interface PlayerCardProps {
  id: string | null
  name: string | null
  role: string | null
}

const imageArray = [discordImage, discordImage2, discordImage3, discordImage4, discordImage5]

const PlayerCard: NextPage<PlayerCardProps> = ({ name, role, id}) => {
  const router = useRouter()
  const randomNumber = Math.floor(Math.random() * imageArray.length)
  const chosenImage = imageArray[randomNumber]

  return (
    <motion.div layout animate={{ opacity: 1}} initial={{ opacity: 0 }} exit={{ opacity: 0}}>
      <div onClick={() => router.push(`/player/${id}`)} className="flex items-center bg-gray-800 hover:shadow-xl transition duration-30 rounded-lg overflow-hidden cursor-pointer">
        <div className="p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {role === "ADMIN"
              ? <img className="h-10 w-10 rounded-full object-cover" src={krunkerEsportsImage.src} alt="" />
              : <img className="h-10 w-10 rounded-full" src={chosenImage?.src} alt="" />
              }
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-100">
                {name}
              </p>
              <div className="flex space-x-1 text-sm text-gray-400">
                {role === "ADMIN"
                ? <p className='text-green-600 font-semibold'>{role}</p>
                : <p>{role}</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlayerCard
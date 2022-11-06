import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface InfoCardProps {
  title: string
  info: string
  slug: string
}

const InfoCard: NextPage<InfoCardProps> = ({title, info, slug}) => {
  return (
    <Link href={`/${slug}`}>
      <div className="flex flex-col justify-between gap-8 p-4 bg-[#3E4756] rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col justify-between gap-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-gray-300">
              {info}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InfoCard
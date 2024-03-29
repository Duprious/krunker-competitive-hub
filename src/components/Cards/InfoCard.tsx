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
      <div className="flex flex-col justify-between gap-8 p-4 dark:bg-gray-800 bg-stone-50 rounded-lg shadow-xl">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col justify-between gap-4">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="dark:text-gray-300 text-gray-800 line-clamp-3 leading-7 min-h-[3.5em]">
              {info}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default InfoCard
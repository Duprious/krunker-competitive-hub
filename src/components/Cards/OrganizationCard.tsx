import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface OrganizationCardProps {
  name: string
  region: string
}

const OrganizationCard: NextPage<OrganizationCardProps> = ({name, region}) => {
  return (
    <Link href={`/admin/organizations/${name}`}>
      <div className="flex flex-col justify-between gap-8 p-4 dark:bg-slate-800 bg-gray-50 rounded-lg shadow-xl">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col justify-between gap-4">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-300">
            <span className=" font-semibold dark:text-gray-100 text-gray-500 rounded-full">
              Region: {region}
            </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OrganizationCard
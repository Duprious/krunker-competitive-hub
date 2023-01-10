import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface OrganizationCardProps {
  id: string
  name: string
  region: string
}

const OrganizationCard: NextPage<OrganizationCardProps> = ({id, name, region}) => {
  return (
    <Link href={`/admin/organizations/${name}`}>
      <div className="flex flex-col border border-cyan-300/40 justify-between gap-8 p-4 bg-slate-700/60 rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col justify-between gap-4">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-300">
            <span className="px-2 py-1 font-semibold text-gray-100 rounded-full bg-gray-700">
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
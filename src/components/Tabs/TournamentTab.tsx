import { Tab } from '@headlessui/react'
import { NextPage } from 'next';
import React, { useState } from 'react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

type TournamentData = {
  description: string | undefined;
  hostName: string | undefined;
  id: string | undefined;
  region: string | undefined;
  startDate: Date | undefined;
  type: string | undefined;
  name: string | undefined;
}


const TournamentTab: NextPage<TournamentData> = ({description, hostName, id, name, region, startDate, type}) => {
  const [categories] = useState(["Info", "Date", "Misc", "Bracket", "Rules"   ])

  return (
    <div className="w-full justify max-w-3xl sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {categories.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
              
                classNames(
                  'w-full py-2.5 text-sm font-medium text-white rounded-xl',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-900 ring-white ring-opacity-60',
                  selected
                    ? 'bg-blue-900/20 text-white'
                    : 'hover:bg-blue-900/20 hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-6">
          <Tab.Panel>
            <p className='text-lg'>ID: {id}</p>
            <p className='text-lg'>Description: {description}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className='text-lg'>Start Date: | {startDate?.toString()} |</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className='text-lg'>Type: {type}</p>
            <p className='text-lg'>Region: {region}</p>
            <p className='text-lg'>Host: {hostName}</p>
          </Tab.Panel>
          <Tab.Panel>
            Doesn't exist yet
          </Tab.Panel>
          <Tab.Panel>
            Rules coming later
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default TournamentTab
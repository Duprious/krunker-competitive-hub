import { Tab } from '@headlessui/react'
import { format } from 'date-fns';
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
}


const TournamentTab: NextPage<TournamentData> = ({description, hostName, id, region, startDate, type}) => {
  const [categories] = useState(["Info", "Date", "Misc", "Bracket", "Rules"   ])

  return (
    <div className="w-full justify max-w-full sm:px-0">
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
            <p className='text-xl'>ID: {id}</p>
            <p className='text-xl'>Description: {description}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className='text-xl'>{startDate ? format(startDate, "EEEE, MMM Do 'at' h:mm a") : "Unknown"}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className='text-xl'>Type: {type}</p>
            <p className='text-xl'>Region: {region}</p>
            <p className='text-xl'>Host: {hostName}</p>
          </Tab.Panel>
          <Tab.Panel>
            {id === "clc4s54ss0000mi08gdfk1d8j" ? <iframe src="https://challonge.com/EU_S2_2v2/module" width="100%" height="625" className='border-0' scrolling="auto" allowTransparency={true}></iframe> : <p className='text-xl'>No bracket available</p>}
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
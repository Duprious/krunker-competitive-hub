import { Tab } from '@headlessui/react'
import { format } from 'date-fns';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
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
  bracketLink: string | null | undefined;
}


const TournamentTab: NextPage<TournamentData> = ({description, hostName, id, region, startDate, type, bracketLink}) => {
  const [categories] = useState(["Info", "Date", "Bracket", "Rules", "Teams (Link)", "Signups (Link)"])
  const router = useRouter()

  return (
    <div className="w-full justify max-w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl dark:bg-blue-900/20 bg-blue-900/40 p-1">
          {categories.map((category) => (
            category === "Teams (Link)" ? 
              <Tab
                onClick={() => router.push(`/tournaments/${id}/teams`)}
                key={category}
                className={({ selected }) =>
                
                  classNames(
                    'w-full py-2.5 text-sm font-medium dark:text-white rounded-xl',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-900 ring-white ring-opacity-60',
                    selected
                      ? 'bg-blue-900/20 text-white'
                      : 'hover:bg-blue-900/20 hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            :
            category === "Signups (Link)" ?
            <Tab
                onClick={() => router.push(`/tournaments/signups/${id}`)}
                key={category}
                className={({ selected }) =>
                
                  classNames(
                    'w-full py-2.5 text-sm font-medium dark:text-white text-gray-900 rounded-xl',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-900 ring-white ring-opacity-60',
                    selected
                      ? 'bg-blue-900/20 text-white'
                      : 'hover:bg-blue-900/20 hover:text-white'
                  )
                }
              >
                {category}
              </Tab>
            :
            <Tab
              key={category}
              className={({ selected }) =>
              
                classNames(
                  'w-full py-2.5 text-sm font-medium dark:text-white text-gray-900 rounded-xl',
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
            <p className='text-xl'>Type: {type}</p>
            <p className='text-xl'>Region: {region}</p>
            <p className='text-xl'>Host: {hostName}</p>
          </Tab.Panel>
          <Tab.Panel>
            <p className='text-xl'>{startDate ? format(startDate, "EEEE, MMM do 'at' h:mm a") : "Unknown"}</p>
          </Tab.Panel>
          <Tab.Panel>
            {bracketLink 
            ? <iframe src={`${bracketLink}/module`} width="100%" height="625" className='border-0 overflow-hidden' allowTransparency={true} />
            : <p className='text-xl'>No Bracket Added Yet</p>
            }
          </Tab.Panel>
          <Tab.Panel>
            <div className='flex items-center justify-center'>
              <iframe className='hidden lg:block' width="75%" height="625" src="https://docs.google.com/document/d/e/2PACX-1vSUh-bcA07ZxO1Isfe3xVZRZKrrpovQUZQ3HYN7VLcJiOIND6dDembQGQQhU4q9EKUjZmYo43mRsjx9/pub?embedded=true" />
              <button className="lg:hidden text-white w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                Rules
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            
          </Tab.Panel>
          <Tab.Panel>
            
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default TournamentTab
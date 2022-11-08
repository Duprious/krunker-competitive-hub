import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import TournamentCard from '../components/Cards/TournamentCard'
import Layout from '../components/Layout'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import { trpc } from '../utils/trpc'

const Tournaments: NextPage = () => {

  const { data: tournamentData } = trpc.tournament.getTournaments.useQuery()
  const { data: userData } = trpc.user.getUser.useQuery()

  const filters = [
    { name: 'ALL' },
    { name: 'EU' },
    { name: 'NA' },
    { name: 'ASIA' },
    { name: 'OCE' },
    { name: 'SA' },
    { name: 'AF' },
  ]

  const [selected, setSelected] = React.useState(filters[0])

  return (
    <Layout>  
      <main className="container mx-auto flex min-h-screen flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Upcoming Krunker Tournaments
              </h1>
              <div className="md:mr-8 mt-4 flex flex-col text-center text-lg dark:text-teal-500 font-medium text-gray-800">
                {`${userData?.name} | ${userData?.role}`}
                {userData?.role === "ADMIN" &&
                  <Link href={"/admin/tournament/create"}>
                    <button type="button" className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      Add Tournament
                    </button>
                  </Link> 
                }
              </div>
            </div>
            <hr className="mt-6" />
          </div>
          <div className='mt-4 flex justify-center md:justify-end md:mr-12'>
            <div className='w-32'>
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-black">{selected?.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filters.map((filter, filterIdx) => (
                        <Listbox.Option
                        key={filterIdx}
                        className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={filter}
                      >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                                >
                                {filter.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
          <ul className="grid gap-4 pt-10 md:grid-cols-2 xl:grid-cols-3">
            {tournamentData?.map((tournament) => (
              tournament.region.split(' ')[0] === selected?.name || selected?.name === 'ALL' ? (
                <li key={tournament.id}>
                  <TournamentCard
                  name={tournament.name}
                  description={tournament.description}
                  region={tournament.region}
                  startDate={tournament.startDate.toString()}
                  type={tournament.type}
                  hostName={tournament.hostName}
                  slug={tournament.slug}
                  />
                </li>
              ) : null
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Tournaments
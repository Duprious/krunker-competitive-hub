import { GetServerSideProps, NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import PlayerCard from '../components/Cards/PlayerCard'
import Layout from '../components/Layout'
import { trpc } from '../utils/trpc'
import { AnimatePresence, motion } from 'framer-motion'
import { getServerAuthSession } from '../server/common/get-server-auth-session'

const PlayersPage: NextPage = () => {
  
  const { data: playersData } = trpc.user.getAllUsers.useQuery()
  const [searchData, setSearchData] = useState(playersData)

  playersData?.sort((a, b) => {
    return a.role == "ADMIN" ? -1 : 1
  })

  useEffect(() => {
    setSearchData(playersData)
  }, [playersData])
  

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return setSearchData(playersData)

    const filteredData = playersData?.filter((player) => {
      return player.name?.toLowerCase().includes(e.target.value.toLowerCase())
    })
    
    setSearchData(filteredData)
  }

  return (
    <Layout>
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Players
              </h1>
              <form className='text-center mx-auto md:mr-8' onSubmit={(e) => e.preventDefault()}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input autoComplete='off' onChange={(e) => handleSearch(e)} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Players" required />
                </div>
              </form>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section>
          <motion.div layout>
            <ul className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {searchData?.map((player) => (
                  <li key={player.id}>
                    <PlayerCard name={player.name} role={player.role} image={player.image?.toString()} id={player.id} />
                  </li>
                ))}
              </AnimatePresence>
            </ul>
          </motion.div>
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

export default PlayersPage
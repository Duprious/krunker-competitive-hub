import { GetServerSideProps, NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import PlayerCard from '../components/Cards/PlayerCard'
import Layout from '../components/Layout'
import { trpc } from '../utils/trpc'
import { AnimatePresence, motion } from 'framer-motion'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import LoadingAnim from '../components/Loading/LoadingAnim'

const PlayersPage: NextPage = () => {
  
  const { data: playersData, isLoading } = trpc.user.getAllUsers.useQuery()
  const [searchData, setSearchData] = useState(playersData)
  const [numToShow, setNumToShow] = useState(40);

  const showMore = () => {
    setNumToShow(numToShow + 40);
  };

  useEffect(() => {
    playersData?.sort((a, b) => {
      if (a.role === b.role) {
        let aName = ""
        let bName = ""
        if (a.name == null) {
          aName = ""
        } else {
          aName = a.name
        }
  
        if (b.name == null) {
          bName = ""
        } else {
          bName = b.name
        }
        return aName > bName ? 1 : -1
      }
      return a.role == "ADMIN" ? -1 : 1
    })
    setSearchData(playersData)
  }, [playersData])
  

  // useDebounce(() => {
  //   const filteredData = playersData?.filter((player) => {
  //     return player.name?.toLowerCase().includes(inputName)
  //   })
  //   setSearchData(filteredData)
  // }, [inputName, playersData], 800)
  

  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.value) return setSearchData(playersData)
  //   setInputName(e.target.value.toLowerCase())
  // }


  return (
    <Layout>
      {
        isLoading ? <LoadingAnim />
        :
        <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Players
              </h1>
              {/* <form className='text-center mx-auto md:mr-8' onSubmit={(e) => e.preventDefault()}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only text-gray-300">Search</label>
                <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input autoComplete='off' onChange={(e) => handleSearch(e)} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm rounded-lg border dark:bg-gray-700 bg-gray-100 dark:border-gray-600 border-gray-200 dark:placeholder-gray-400 placeholder-gray-300 dark:text-white text-black focus:ring-blue-500 focus:border-blue-500" placeholder="Search Players" required />
                </div>
              </form> */}
            </div>
          </div>
        </section>
        <section>
          <motion.div layout>
            <ul className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {searchData?.slice(0, numToShow).map((player) => (
                  <li key={player.id}>
                    <PlayerCard name={player.name} role={player.role} id={player.id} />
                  </li>
                ))}
              </AnimatePresence>
            </ul>
            <div className='flex justify-center items-center pt-4'>
              {numToShow < (searchData?.length as number) && (
                <button className="my-4 p-2 border border-gray-600 dark:border-gray-400 rounded" onClick={showMore}>
                  Show More
                </button>
              )}
            </div>
          </motion.div>
        </section>
      </main>
      }
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
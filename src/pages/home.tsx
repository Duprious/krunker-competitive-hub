import { NextPage } from 'next'
import React, { useState } from 'react'
import TournamentCard from '../components/Cards/TournamentCard'
import Layout from '../components/Layout'
import { trpc } from '../utils/trpc'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import FilterBox from '../components/Boxes/FilterBox'
import { useStore } from '../zustand/store'

const Tournaments: NextPage = () => {

  const selectedFilter = useStore(state => state.selectedFilter)
  const { data: tournamentData } = trpc.tournament.getTournaments.useQuery()

  tournamentData?.sort((a, b) => {
    return new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf();
  });

  const [numToShow, setNumToShow] = useState(3);

  const showMore = () => {
    setNumToShow(numToShow + 3);
  };

  return (
    <Layout>  
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Upcoming Krunker Tournaments
              </h1>
              <div className="md:mr-8 mt-4 flex flex-col text-center text-lg font-medium">
                <div className='w-32'>
                  <FilterBox />
                </div>
              </div>
            </div>
          </div>
          <motion.div layout>
            <ul className="grid gap-4 pt-10">
              <AnimatePresence> 
                {tournamentData?.map((tournament) => (
                  tournament.region.split(' ')[0] === selectedFilter || selectedFilter === 'ALL' ? (
                    tournament.ended ? null : (
                    <li key={tournament.id}>
                      <TournamentCard
                      name={tournament.name}
                      organization={tournament.Organization}
                      description={tournament.description}
                      region={tournament.region}
                      startDate={tournament.startDate.toString()}
                      type={tournament.type}
                      id={tournament.id}
                      signupsClosed={tournament.signupsClosed}
                      teamsLength={tournament.teams.length}
                      />
                    </li>
                  )) : null
                  ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        </section>
        <section>
          <div className="pt-16">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Past Krunker Tournaments
              </h1>
              <div className="md:mr-8 mt-4 flex flex-col text-center text-lg font-medium">
              </div>
            </div>
          </div>
          <motion.div layout>
            <ul className="grid gap-4 pt-10">
              <AnimatePresence> 
                {tournamentData?.reverse().slice(0, numToShow).map((tournament) => (
                  tournament.region.split(' ')[0] === selectedFilter || selectedFilter === 'ALL' ? (
                    !tournament.ended ? null : (
                    <li key={tournament.id}>
                      <TournamentCard
                      name={tournament.name}
                      organization={tournament.Organization}
                      description={tournament.description}
                      region={tournament.region}
                      startDate={tournament.startDate.toString()}
                      type={tournament.type}
                      id={tournament.id}
                      signupsClosed={tournament.signupsClosed}
                      teamsLength={tournament.teams.length}
                      />
                    </li>
                  )) : null
                  ))}
              </AnimatePresence>
            </ul>
            <div className='flex justify-center items-center pt-4'>
              {numToShow < (tournamentData?.length as number) && (
                <button className="my-4 p-2 border border-gray-600 dark:border-gray-400 rounded" onClick={showMore}>
                  Show More
                </button>
              )}
            </div>
          </motion.div>
        </section>
      </main>
      <Toaster />
    </Layout>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getServerAuthSession(context)
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }

export default Tournaments
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import TournamentCard from '../components/Cards/TournamentCard'
import Layout from '../components/Layout'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
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
            <hr className="mt-6" />
          </div>
          <motion.div layout>
            <ul className="grid gap-4 pt-10 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence> 
                {tournamentData?.map((tournament) => (
                  tournament.region.split(' ')[0] === selectedFilter || selectedFilter === 'ALL' ? (
                    <li key={tournament.id}>
                      <TournamentCard
                      name={tournament.name}
                      description={tournament.description}
                      region={tournament.region}
                      startDate={tournament.startDate.toString()}
                      type={tournament.type}
                      hostName={tournament.hostName}
                      id={tournament.id}
                      />
                    </li>
                  ) : null
                  ))}
              </AnimatePresence>
            </ul>
          </motion.div>
        </section>
      </main>
      <Toaster />
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
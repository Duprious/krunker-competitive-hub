import { GetServerSideProps } from 'next'
import React from 'react'
import TournamentCard from '../components/Cards/TournamentCard'
import Layout from '../components/Layout'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import { trpc } from '../utils/trpc'

const Home = () => {

  const { data: tournamentData } = trpc.tournament.getTournaments.useQuery()
  const { data: userData } = trpc.user.getUser.useQuery()

  return (
    <Layout>  
      <main className="container mx-auto flex min-h-screen flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Upcoming Krunker Tournaments
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg dark:text-teal-500 font-medium text-gray-800">
                {`${userData?.name} | ${userData?.role}`}
              </div>
            </div>
            <hr className="mt-10" />
          </div>
          <ul className="grid gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3">
            {tournamentData?.map((tournament) => (
              <li key={tournament.id}>
                <TournamentCard
                name={tournament.name}
                description={tournament.description}
                region={tournament.region}
                startDate={tournament.startDate.toString()}
                type={tournament.type}
                slug={tournament.slug}
                />
              </li>
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

export default Home
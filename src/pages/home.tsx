import React from 'react'
import Layout from '../components/Layout'
import { GetServerSideProps, NextPage } from 'next'
import InfoCard from '../components/Cards/InfoCard'
import { getServerAuthSession } from '../server/common/get-server-auth-session'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {

  const { data: userData } = trpc.user.getUser.useQuery()

  const infoCards = [
    {
      title: 'Tournaments',
      info: 'View upcoming tournaments.',
      slug: 'tournaments'
    },
    {
      title: 'Players',
      info: 'View all players',
      slug: 'players'
    },
    {
      title: 'Profile',
      info: 'View your profile and edit your information.',
      slug: 'profile'
    }
  ]

  return (
    <Layout>
      <main className="container mx-auto flex min-h-screen flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl text-cyan-600 font-semibold md:ml-8 md:text-start">
                Krunker Competitive Hub
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg dark:text-teal-500 font-medium text-gray-800">
                {`${userData?.name || "..."} | ${userData?.role || "..."}`}
              </div>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section>
          <ul className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {infoCards.map((infoCard, index) => (
              <li key={index}>
                <InfoCard title={infoCard.title} info={infoCard.info} slug={infoCard.slug} />
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
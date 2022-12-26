import React from 'react'
import Layout from '../../components/Layout'
import InfoCard from '../../components/Cards/InfoCard'
import { GetServerSideProps } from 'next'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import { trpc } from '../../utils/trpc'
import Link from 'next/link'

const adminCards = [
  {
    title: 'Teams',
    info: 'View signed up teams',
    slug: 'kpc/teams'
  },
  {
    title: 'Challonge Bracket Creation',
    info: 'Create Challonge bracket automatically (seeded)',
    slug: 'kpc/challonge'
  },
  {
    title: 'Signup Form',
    info: 'KPC 2v2 Signup Form for Users',
    slug: 'kpc/signup'
  },
]

const ControlPanel = () => {

  const user = trpc.user.getUser.useQuery()

  return (
    <Layout>
      {user.data?.role === "ADMIN" ?
        <main className="container mx-auto flex flex-col justify-start p-4">
          <section>
            <div className="pt-10">
              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                  KPC 2v2 Tournament (Admin Panel)
                </h1>
              </div>
              <hr className="mt-10" />
            </div>
          </section>
          <section>
            <ul className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {adminCards.map((adminCard) => (
                <li key={adminCard.title}>
                  <InfoCard title={adminCard.title} info={adminCard.info} slug={adminCard.slug} />
                </li>
              ))}
            </ul>
          </section>
        </main>
        : 
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">You are not an admin</h1>
          <p className="text-gray-500 dark:text-gray-400">You are not authorized to see this page</p>
          <Link href="/home">
            <p className="text-blue-600 dark:text-blue-500 hover:underline">Return to the homepage</p>
          </Link>
        </div>
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

export default ControlPanel
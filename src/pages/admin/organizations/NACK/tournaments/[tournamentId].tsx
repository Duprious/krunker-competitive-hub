import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import InfoCard from '../../../../../components/Cards/InfoCard'
import Layout from '../../../../../components/Layout'
import { getServerAuthSession } from '../../../../../server/common/get-server-auth-session'
import { trpc } from '../../../../../utils/trpc'

const AdminTournamentPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query})
  const { data: userData } = trpc.user.getUser.useQuery()
  return (
    <Layout>
      {userData?.role === 'ADMIN' ?
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                {tournamentData?.name}
              </h1>
            </div>
            <hr className="mt-10 dark:border-white border-gray-900" />
          </div>
        </section>
        <section>
          <ul className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard title="Signed Up Teams" info="View all teams signed up for the tournament" slug={`admin/organizations/NACK/tournaments/${query}/teams`} />
            <InfoCard title="Signup Page" info="View the signup page for the tournament" slug={`tournaments/signups/${query}`} />
            <InfoCard title="Edit Tournament" info="Edit the tournament" slug={`admin/organizations/NACK/tournaments/${query}/edit`} />
          </ul>
        </section>
      </main>
      :
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-100">You are not an admin</h1>
        <p className="text-gray-400">You are not authorized to see this page</p>
        <Link href="/home">
          <p className="text-blue-500 hover:underline">Return to the homepage</p>
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

export default AdminTournamentPage
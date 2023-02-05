import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import AdminTournamentCard from '../../../components/Cards/AdminTournamentCard'
import Layout from '../../../components/Layout'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { trpc } from '../../../utils/trpc'

const OrganizationPage = () => {
  const router = useRouter()
  const query = router.query.organizationName as string
  const { data: tournamentsData} = trpc.organizations.getOrganizationTournaments.useQuery({name: query})
  const { data: userData } = trpc.user.getUser.useQuery()

  tournamentsData?.tournaments.sort((a, b) => {
    if (a.ended && !b.ended) {
      return 1
    } else if (!a.ended && b.ended) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <Layout>
      {userData?.role === "ADMIN" ?
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Organization: {query}
                <p className='text-xl text-red-500 mt-3'>Manage tournaments here</p>
              </h1>
              <div className="md:mr-8 flex flex-col text-center text-lg font-medium">
                <Link href={`/admin/tournament/create`}>
                  <button type="button" className="text-white mt-4 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                    Add Tournament
                  </button>
                </Link> 
              </div>
            </div>
          </div>
        </section>
        <section>
          <ul className="grid gap-4 pt-10 ">
            {tournamentsData?.tournaments.map((tournament) => (
              <li key={tournament.id}>
                <AdminTournamentCard
                  name={tournament.name}
                  description={tournament.description}
                  startDate={tournament.startDate.toLocaleString()}
                  id={tournament.id}
                  region={tournament.region}
                  type={tournament.type}
                  organization={query}
                  teamsLength={tournament.teams.length}
                  ended={tournament.ended}
                  hostName={tournament.hostName}
                />
              </li>
            ))}
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

export default OrganizationPage
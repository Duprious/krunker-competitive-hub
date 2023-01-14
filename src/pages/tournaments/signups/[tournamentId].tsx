import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Layout from '../../../components/Layout'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { trpc } from '../../../utils/trpc'


const Signup: NextPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: tournamentData, error } = trpc.tournament.getTournament.useQuery({id: query})
  
  return (
    <Layout>
      { tournamentData === null ?
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-gray-100">Error</h1>
          <p className="text-gray-400">There was an error loading the tournament</p>
          <Link href="/home">
            <p className="text-blue-500 hover:underline">Return to the homepage</p>
          </Link>
        </div>
      :
      tournamentData?.signupsClosed ?
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold text-gray-100">Signups Closed</h1>
          <p className="text-gray-400">Signups have been closed and maximum teams have been reached</p>
          <Link href="/home">
            <p className="text-blue-500 hover:underline">Return to the homepage</p>
          </Link>
        </div>
      : 
        <main className="container mx-auto flex flex-col justify-start p-4">
          <section>
            <div className="pt-4">
              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                  {tournamentData?.name} Signups
                </h1>
              </div>
              <hr className="mt-10" />
            </div>
          </section>
          <section>
            test
          </section>
        </main> 
      }
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

export default Signup
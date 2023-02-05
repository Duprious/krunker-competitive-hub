import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import TwoVsTwoSignupForm from '../../../components/Forms/2v2SignupForm'
import ThreeVsThreeSignupForm from '../../../components/Forms/3v3SignupForm'
import FourVsFourSignupForm from '../../../components/Forms/4v4SignupForm'
import Layout from '../../../components/Layout'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { trpc } from '../../../utils/trpc'


const Signup: NextPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query})
  
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
      (tournamentData?.signupsClosed) || (tournamentData?.ended) || (tournamentData?.teams ? tournamentData?.teams.length >= tournamentData.maxTeams : null )  ?
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold dark:text-gray-100 text-gray-800">Signups Closed</h1>
          <p className="dark:text-gray-400 text-gray-600">Signups have been closed because the maximum amount of teams have been reached or the Tournament has ended.</p>
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
            </div>
          </section>
          <section>
            {tournamentData?.type === "2v2" ?
              <TwoVsTwoSignupForm tournamentId={query} />
            : tournamentData?.type === "3v3" ?
              <ThreeVsThreeSignupForm tournamentId={query} />
            : tournamentData?.type === "4v4" ?
              <FourVsFourSignupForm tournamentId={query} />
            : null}
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
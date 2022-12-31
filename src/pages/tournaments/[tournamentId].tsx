import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import { trpc } from '../../utils/trpc'

const TournamentPage: NextPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: userData} = trpc.user.getUser.useQuery()
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query})


  return (
    <Layout>
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                {tournamentData?.name}
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg dark:text-teal-500 font-medium text-gray-800">
                {userData?.role === "ADMIN" &&
                  <button type="button" className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Add Bracket (if it exists)
                  </button>
                }
              </div>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section className='pt-6'>
          <div className='flex flex-col gap-6 font-md'>
            <h1 className='text-3xl font-semibold'>Tournament Info</h1>
            <p className='text-lg'>Tournament ID: {tournamentData?.id}</p>
            <p className='text-lg'>Tournament Name: {tournamentData?.name}</p>
            <p className='text-lg'>Tournament Description: {tournamentData?.description}</p>
            <p className='text-lg'>Tournament Start Date: | {tournamentData?.startDate.toString()} |</p>
            <p className='text-lg'>Tournament Type: {tournamentData?.type}</p>
            <p className='text-lg'>Tournament Region: {tournamentData?.region}</p>
            <p className='text-lg'>Tournament Host: {tournamentData?.hostName}</p>

            {tournamentData?.id === "clc4s54ss0000mi08gdfk1d8j" &&
              <Link href="/kpc/signup">
                <button className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Sign Up Here
                </button>
              </Link>
            }
        </div>
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

export default TournamentPage
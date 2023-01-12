import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import KPCSignupForm from '../../components/KPC/SignupForm'
import Layout from '../../components/Layout'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import { trpc } from '../../utils/trpc'

const Signup: NextPage = () => {
  const { data: teamsData } = trpc.kpcTeam.getAllTeams.useQuery()

  return (
    <Layout>
      {teamsData && teamsData.length < 16 ? 
        <main className="container mx-auto flex flex-col justify-start p-4">
          <section>
            <div className="pt-4">
              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                  KPC EU Tournament Signup
                </h1>
              </div>
              <hr className="mt-10" />
            </div>
          </section>
          <section>
            <KPCSignupForm />
          </section>
        </main>
      : 
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-100">Tournament full</h1>
        <p className="text-gray-400">Max amount of teams have already signed up</p>
        <Link href="/home">
          <p className="text-blue-500 hover:underline">Return to the homepage</p>
        </Link>
      </div>
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
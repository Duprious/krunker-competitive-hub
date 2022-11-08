import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import AddTournamentForm from '../../../components/Forms/AddTournamentForm'
import Layout from '../../../components/Layout'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { trpc } from '../../../utils/trpc'

const CreateTournamentPage = () => {

  const user = trpc.user.getUser.useQuery()

  return (
    <Layout>
      {user.data?.role === "ADMIN" ?
      <main className="container mx-auto flex min-h-screen flex-col justify-start p-4">  
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Add a Tournament
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg dark:text-teal-500 font-medium text-gray-800">
                ADMIN
              </div>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section className='pt-10'>
          <AddTournamentForm />
        </section>
      </main>

      : <div className="flex flex-col items-center justify-center h-screen">
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

export default CreateTournamentPage
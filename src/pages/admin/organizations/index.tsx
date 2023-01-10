import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import OrganizationCard from '../../../components/Cards/OrganizationCard'
import Layout from '../../../components/Layout'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { trpc } from '../../../utils/trpc'

const OrganizationsPage = () => {
  const { data: organizationsData } = trpc.organizations.getAllOrganizations.useQuery()
  const { data: userData } = trpc.user.getUser.useQuery()
  return (
    <Layout>
      {userData?.role === "ADMIN" ?
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Organizations
              </h1>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section>
          <ul className="grid gap-4 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {organizationsData?.map((organization) => (
              <li key={organization.id}>
                <OrganizationCard name={organization.name} region={organization.region} />
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

export default OrganizationsPage
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import TeamCard from '../../components/KPC/TeamCard'
import Layout from '../../components/Layout'
import TeamOptionsModal from '../../components/Modals/TeamOptionsModal'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import { trpc } from '../../utils/trpc'

const Teams: NextPage = () => {
  const user = trpc.user.getUser.useQuery()
  const { data: allTeamsData } = trpc.kpcTeam.getAllTeams.useQuery()
  return (
    <Layout>
      {user.data?.role === "ADMIN" ?
      <>
        <TeamOptionsModal />
        <main className="container mx-auto flex flex-col justify-start p-4">
          <section>
            <div className="pt-10">
              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                  Signed-Up Teams
                </h1>
                <div className="md:mr-8 mt-4 text-center text-lg dark:text-teal-500 font-medium text-gray-800">
                  {`Total Teams: ${allTeamsData?.length}`}
                </div>
              </div>
              <hr className="mt-10" />
            </div>
          </section>
          <section>
            <ul className="grid gap-4 pt-10 md:grid-cols-2 xl:grid-cols-3">
              {allTeamsData?.map((team) => (
                <li key={team.teamName}>
                  <TeamCard
                  captain={team.captain}
                  discordPlayerOne={team.discordPlayerOne}
                  discordPlayerTwo={team.discordPlayerTwo}
                  ignPlayerOne={team.ignPlayerOne}
                  ignPlayerTwo={team.ignPlayerTwo}
                  teamName={team.teamName}
                  id={team.id}
                  validated={team.validated}
                  teamsMenu={true}
                  />
                </li>
              ))}
            </ul>
          </section>
        </main>
      </>
      :
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">You are not an admin</h1>
        <p className="text-gray-500 dark:text-gray-400">You are not authorized to see this page</p>
        <Link href="/home">
          <p className="text-blue-600 dark:text-blue-500 hover:underline">Return to the homepage</p>
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

export default Teams
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import TeamCard from '../../components/KPC/TeamCard'
import Layout from '../../components/Layout'
import TeamOptionsModal from '../../components/Modals/TeamOptionsModal'
import { getServerAuthSession } from '../../server/common/get-server-auth-session'
import { trpc } from '../../utils/trpc'

const Teams: NextPage = () => {
  const { data: allTeamsData } = trpc.kpcTeam.getAllTeams.useQuery()
  return (
    <Layout>
      <TeamOptionsModal />
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Signed-Up Teams
                <p className='text-xl text-red-500 mt-3'>(To remove your team, contact an Admin)</p>
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg text-teal-500 font-medium">
                {`Total Teams: ${allTeamsData?.length}/24`}
              </div>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section>
          <ul className="grid gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allTeamsData?.map((team) => (
              <li key={team.teamName}>
                <TeamCard
                captain={team.captain}
                discordPlayerOne={team.discordPlayerOne}
                discordPlayerTwo={team.discordPlayerTwo}
                discordSub={team.discordSub}
                ignSub={team.ignSub}
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
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import TeamCard from '../../../../../../components/Cards/TeamCard'
import Layout from '../../../../../../components/Layout'
import TeamOptionsModal from '../../../../../../components/Modals/TeamOptionsModal'
import { getServerAuthSession } from '../../../../../../server/common/get-server-auth-session'
import { trpc } from '../../../../../../utils/trpc'

const AdminTeamsPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query});
  const { data: userData } = trpc.user.getUser.useQuery();
  return (
    <Layout>
      {userData?.role === 'ADMIN' ?
      <main className="container mx-auto flex flex-col justify-start p-4">
        <TeamOptionsModal />
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Signed-Up Teams
                <p className='text-xl text-red-500 mt-3'>(Admin)</p>
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg text-teal-500 font-medium">
                {`Total Teams: ${tournamentData?.teams.length}/${tournamentData?.maxTeams}`}
              </div>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section>
          <ul className="grid gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tournamentData?.teams.map((team) =>
              <li key={team.id}>
                <TeamCard 
                  captain={team.captain}
                  teamName={team.teamName}
                  id={team.id}
                  players={team.players}
                  Sub={team.Sub}
                  validated={team.validated}
                  tournamentType={tournamentData?.type}
                  adminMenu={true}
                />
              </li>
            )}
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

export default AdminTeamsPage
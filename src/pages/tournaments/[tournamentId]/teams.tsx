import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import TeamCard from '../../../components/Cards/TeamCard'
import Layout from '../../../components/Layout'
import { getServerAuthSession } from '../../../server/common/get-server-auth-session'
import { trpc } from '../../../utils/trpc'

const Teams = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query});
  
  return (
    <Layout>
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Signed-Up Teams
                <p className='text-xl text-red-500 mt-3'>(To remove your team, contact an Admin)</p>
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
                  adminMenu={false}
                />
              </li>
            )}
          </ul>
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

export default Teams
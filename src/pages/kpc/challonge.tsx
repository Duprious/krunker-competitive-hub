import { KPCTeam } from '@prisma/client';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import TeamCard from '../../components/KPC/TeamCard';
import Layout from '../../components/Layout';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';
import { trpc } from '../../utils/trpc';

interface TeamSeed extends KPCTeam {
  seed: number
}

const Challonge = () => {
  const { data: teamsData } = trpc.kpcTeam.getAllTeams.useQuery();
  const teams = teamsData?.filter(team => team.validated);
  const createBracketMutation = trpc.challongeRouter.createTournament.useMutation();
  const addParticipantsMutation = trpc.challongeRouter.addParticipants.useMutation();
  const { data: userData } = trpc.user.getUser.useQuery();
  
  const seededTeams = teams?.map(team => {
    return {
      ...team,
      seed: 1
    }
  })
  const [seededTeamsState, setSeededTeamsState] = useState<TeamSeed[]>(seededTeams || [])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, team: TeamSeed) => {
    const newSeed = parseInt(e.target.value)
    const newSeededTeams = seededTeamsState.map(seededTeam => {
      if (seededTeam.id === team.id) {
        return {
          ...seededTeam,
          seed: newSeed
        }
      }
      return seededTeam
    })
    setSeededTeamsState(newSeededTeams)
  }

  const handleClick = () => {
    createBracketMutation.mutateAsync({tournamentName: "2v2 EU $200", tournamentType: "single elimination", tournamentUrl: "EU_S2_2v2"}, {
      onSuccess: () => {
        toast.success("Tournament created successfully")
        const participants = seededTeamsState.map(team => {
          return {
            name: team.teamName,
            seed: team.seed
          }
        })
        addParticipantsMutation.mutateAsync({tournamentUrl: "EU_S2_2v2", participants}, {
          onSuccess: () => {
            toast.success("Participants added successfully")
          },
          onError: () => {
            toast.error("Error adding participants")
          }
        })
      },
      onError: () => {
        toast.error("Error creating tournament")
      }
    })
  }

  return (
    <Layout>
      {userData?.role === "ADMIN" ?
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Seed currently validated teams (Make sure signups are done)
              </h1>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section className='pt-10'>
          <div className="flex flex-wrap">
            {seededTeams?.map((team, index) => (
              <div key={team.id} className="w-1/4 p-2">
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
                teamsMenu={false}
               />
                <div className='flex mt-2'>
                  <select onChange={(e) => handleChange(e, team)} id={`team-${index}`} className="block appearance-none w-full bg-slate-800 border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                    {[...Array(seededTeams.length).keys()].map(number => (
                      <option key={number} value={number + 1}>{number + 1}</option>
                      ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className='flex justify-center pt-12'>
          <div className='flex flex-col justify-center items-center'>
            <button disabled={seededTeams?.length == 0} onClick={() => handleClick()} className="bg-blue-500 disabled:bg-red-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {seededTeams?.length == 0 ? "No teams" : "Create bracket"}
            </button>
            <h1 className='mt-4 text-sm'>On Error, go back to KPC Admin page and Re-enter this page</h1>
          </div>
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
  );
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

export default Challonge
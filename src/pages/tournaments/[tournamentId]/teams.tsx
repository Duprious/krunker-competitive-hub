import { useRouter } from "next/router";
import React from "react";
import { Toaster } from "react-hot-toast";
import TeamCard from "../../../components/Cards/TeamCard";
import Layout from "../../../components/Layout";
import LoadingAnim from "../../../components/Loading/LoadingAnim";
import ChangeTeamModal from "../../../components/Modals/ChangeTeamModal";
import { trpc } from "../../../utils/trpc";

const Teams = () => {
  const router = useRouter();
  const query = router.query.tournamentId as string;
  const { data: tournamentData, isLoading } = trpc.tournament.getTournament.useQuery({
    id: query || ""
  });

  return (
    <Layout>
      {isLoading ? (
        <LoadingAnim />
      ) : (
        <main className="container mx-auto flex flex-col justify-start p-4">
          <section>
            <div className="pt-10">
              <div className="flex flex-col justify-between gap-8 md:flex-row">
                <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                  Signed-Up Teams
                  {/* <p className='text-xl text-red-500 mt-3'>(To remove your team, contact an Admin)</p> */}
                </h1>
                <div className="mt-4 text-center text-lg font-medium text-teal-500 md:mr-8">
                  {`Total Teams: ${tournamentData?.teams.length}/${tournamentData?.maxTeams}`}
                </div>
              </div>
            </div>
          </section>
          <section>
            <ul className="grid gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tournamentData?.teams.map((team) => (
                <li key={team.id}>
                  <TeamCard
                    captain={team.captain}
                    teamName={team.teamName}
                    id={team.id}
                    players={team.players}
                    Sub={team.Sub}
                    validated={team.validated}
                    ended={tournamentData?.ended}
                    tournamentType={tournamentData?.type}
                    adminMenu={false}
                    owner={team.owner}
                  />
                </li>
              ))}
            </ul>
          </section>
        </main>
      )}
      <ChangeTeamModal tournamentId={tournamentData?.id} />
      <Toaster />
    </Layout>
  );
};

export default Teams;

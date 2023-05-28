import { Player, Role } from "@prisma/client";
import { NextPage } from "next";
import React from "react";
import { trpc } from "../../utils/trpc";
import { useStore } from "../../zustand/store";
import { motion } from "framer-motion";

interface TeamCardProps {
  teamName: string;
  players: Player[];
  Sub: Player | null;
  captain: string;
  adminMenu: boolean;
  id: string;
  validated: boolean;
  tournamentType: string;
  ended: boolean;
  owner: {
    id: string;
    name: string | null;
    role: Role;
  };
}

const TeamCard: NextPage<TeamCardProps> = ({
  teamName,
  captain,
  players,
  Sub,
  id,
  validated,
  tournamentType,
  adminMenu,
  owner,
  ended
}) => {
  const setModalOpen = useStore((state) => state.setModalOpen);
  const toggleChangeTeamModal = useStore((state) => state.toggleChangeTeamModal);
  const setCurrentTeam = useStore((state) => state.setCurrentTeam);
  const { data: userData } = trpc.user.getUser.useQuery();

  const handleModalOpen = () => {
    setModalOpen();
    setCurrentTeam(id);
  };

  const handleTeamChangeModalOpen = () => {
    toggleChangeTeamModal();
    setCurrentTeam(id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="mx-auto h-full max-w-sm rounded-md bg-stone-50 p-6 shadow-xl hover:cursor-pointer dark:bg-gray-800"
    >
      <div className="flex items-center justify-start gap-2">
        {adminMenu && userData?.role == "ADMIN" && (
          <h1
            className={`${
              validated ? `bg-green-700` : `bg-red-700/40`
            } rounded-full px-3 py-1 font-semibold text-gray-100`}
          >
            {validated ? "Validated" : "Not Validated"}
          </h1>
        )}
        {owner.id === userData?.id && !adminMenu && !ended && (
          <button
            onClick={() => handleTeamChangeModalOpen()}
            className="rounded-md bg-green-500 px-3 py-1 font-semibold text-gray-100 dark:bg-green-500/60"
          >
            Change Team
          </button>
        )}
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <h1
            className="text-shad text-2xl font-semibold text-gray-600 drop-shadow-md dark:text-gray-200"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
          >
            {teamName}
          </h1>
        </div>
        {players.map((player, index) => (
          <p key={index} className="mt-2 break-words text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Player {index + 1}: </span>
            {`${player.discordName} | ${player.ign}`}
          </p>
        ))}
        {Sub ? (
          <p className="mt-2 break-words text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Sub: </span>
            {`${Sub.discordName} | ${Sub.ign}`}
          </p>
        ) : (
          <p className="mt-2 break-words text-gray-700 dark:text-gray-300">
            <span className="font-semibold">No Sub </span>
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        {tournamentType == "2v2" && (
          <h1 className="text-gray-600 dark:text-gray-200">
            Captain:{" "}
            <span className="font-medium">
              {captain == "P1" ? `${players[0]?.discordName}` : `${players[1]?.discordName}`}
            </span>
          </h1>
        )}
        {tournamentType == "3v3" && (
          <h1 className="text-gray-600 dark:text-gray-200">
            Captain:{" "}
            <span className="font-medium">
              {captain == "P1"
                ? `${players[0]?.discordName}`
                : captain == "P2"
                ? `${players[1]?.discordName}`
                : `${players[2]?.discordName}`}
            </span>
          </h1>
        )}
        {tournamentType == "4v4" && (
          <h1 className="text-gray-600 dark:text-gray-200">
            Captain:{" "}
            <span className="font-medium">
              {captain == "P1"
                ? `${players[0]?.discordName}`
                : captain == "P2"
                ? `${players[1]?.discordName}`
                : captain == "P3"
                ? `${players[2]?.discordName}`
                : `${players[3]?.discordName}`}
            </span>
          </h1>
        )}
        {adminMenu && userData?.role == "ADMIN" && (
          <button
            onClick={() => handleModalOpen()}
            className="rounded-full bg-red-500/60 px-3 py-1 font-semibold text-gray-100"
          >
            Options
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default TeamCard;

import { NextPage } from "next";
import React from "react";
import { convertTime } from "../../utils/convertTime";
import { motion } from "framer-motion";
import { Organization } from "@prisma/client";
import Link from "next/link";
import { Roboto_Condensed } from "@next/font/google";
import krunkerImage from "../../../public/krunkeresportssquare.jpg";
import kpcImage from "../../../public/kpc.jpg";
import nackImage from "../../../public/nack.png";
import ckaImage from "../../../public/cka.png";
import krunkerImageOther from "../../../public/krunker.png";

interface TournamentCardProps {
  name: string;
  startDate: string;
  region: string;
  type: string;
  description: string;
  id: string;
  organization: Organization | null;
  signupsClosed: boolean;
  teamsLength: number;
}

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: "700"
});

const TournamentCard: NextPage<TournamentCardProps> = ({
  name,
  startDate,
  region,
  type,
  description,
  id,
  organization,
  signupsClosed,
  teamsLength
}) => {
  return (
    <motion.div layout animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
      <div className="relative max-w-6xl rounded-md bg-white p-6 shadow-xl dark:bg-gray-800 lg:mx-0">
        <div className="flex justify-start gap-8">
          <div className="flex min-w-fit items-center">
            {organization?.name === "KrunkerEsports" ? (
              <img
                src={krunkerImage.src}
                alt="Krunker Esports Logo"
                className="hidden rounded-full md:block md:h-32 md:w-32"
              />
            ) : organization?.name === "KPC" ? (
              <img
                src={kpcImage.src}
                alt="Krunker Pro Circuit Logo"
                className="hidden rounded-full md:block md:h-32 md:w-32"
              />
            ) : organization?.name === "NACK" ? (
              <img
                src={nackImage.src}
                alt="NA Competitive Krunker Logo"
                className="hidden rounded-full md:block md:h-32 md:w-32"
              />
            ) : organization?.name === "CKA" ? (
              <img
                src={ckaImage.src}
                alt="Competitive Krunker Asia Logo"
                className="hidden rounded-full md:block md:h-32 md:w-32"
              />
            ) : (
              <img
                src={krunkerImageOther.src}
                alt="Other Logo"
                className="hidden rounded-full md:block md:h-32 md:w-32"
              />
            )}
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center gap-4">
                {organization?.name === "KrunkerEsports" ? (
                  <img
                    src={krunkerImage.src}
                    alt="Krunker Esports Logo"
                    className="h-10 w-10 rounded-full md:hidden"
                  />
                ) : organization?.name === "KPC" ? (
                  <img
                    src={kpcImage.src}
                    alt="Krunker Pro Circuit Logo"
                    className="h-10 w-10 rounded-full md:hidden"
                  />
                ) : organization?.name === "NACK" ? (
                  <img
                    src={nackImage.src}
                    alt="NA Competitive Krunker Logo"
                    className="h-10 w-10 rounded-full md:hidden"
                  />
                ) : organization?.name === "CKA" ? (
                  <img
                    src={ckaImage.src}
                    alt="Competitive Krunker Asia Logo"
                    className="h-10 w-10 rounded-full md:hidden"
                  />
                ) : (
                  <img
                    src={krunkerImageOther.src}
                    alt="Other Logo"
                    className="h-10 w-10 rounded-full md:hidden"
                  />
                )}
                <h1 className="font-medium text-gray-600 dark:text-gray-200">
                  {organization?.name}
                </h1>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row ">
                <span className="hidden rounded-sm bg-gray-200 px-2 py-1 font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-100 sm:block">
                  {`${teamsLength} Teams`}
                </span>
                <span className="rounded-sm bg-gray-200 px-2 py-1 font-semibold text-gray-500 dark:bg-gray-700 dark:text-gray-100">
                  {`${region} | ${type}`}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-gray-600 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100">
                  {name}
                </h1>
              </div>
              <p className="mt-2 max-w-xl break-words text-gray-700 line-clamp-2 dark:text-gray-300">
                {description}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-2 flex items-center">
                  <Link href={`/tournaments/${id}`}>
                    <span
                      className={`${roboto.className} block border border-black px-3 py-2 tracking-wide text-gray-900 transition-all duration-500 hover:border-transparent hover:bg-[#FFD449]/40 dark:border-gray-400 dark:text-gray-200 dark:hover:border-transparent dark:hover:bg-gray-700`}
                    >
                      INFO
                    </span>
                  </Link>
                </div>
                {!signupsClosed ? (
                  <Link href={`/tournaments/signups/${id}`}>
                    <span
                      className={`${roboto.className} hidden border border-black px-3 py-2 tracking-wide text-gray-900 transition-all duration-500 hover:border-transparent hover:bg-[#FFD449]/40 dark:border-gray-400 dark:text-gray-200 dark:hover:border-transparent dark:hover:bg-gray-700 sm:block`}
                    >
                      SIGNUPS
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
                <div className={`${!signupsClosed ? "ml-2" : "ml-0"} flex items-center`}>
                  <Link href={`/tournaments/${id}/teams`}>
                    <span
                      className={`${roboto.className} hidden border border-black px-3 py-2 tracking-wide text-gray-900 transition-all duration-500 hover:border-transparent hover:bg-[#FFD449]/40 dark:border-gray-400 dark:text-gray-200 dark:hover:border-transparent dark:hover:bg-gray-700 sm:block`}
                    >
                      TEAMS
                    </span>
                  </Link>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 dark:text-gray-200">
                    {convertTime(startDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TournamentCard;

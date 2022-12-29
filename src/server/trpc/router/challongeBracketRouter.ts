import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { router, protectedProcedure } from "../trpc";

const apiKey = env.CHALLONGE_API_KEY

export const challongeBracketRouter = router({
  createTournament: protectedProcedure
    .input(
      z.object({
        tournamentName: z.string(),
        tournamentType: z.string(),
        tournamentUrl: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { tournamentName, tournamentType, tournamentUrl } = input;
      const response = await fetch(
        `https://api.challonge.com/v1/tournaments.json?api_key=${apiKey}&tournament[name]=${tournamentName}&tournament[tournament_type]=${tournamentType}&tournament[url]=${tournamentUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    }),
    addParticipants: protectedProcedure
      .input(
        z.object({
          tournamentUrl: z.string(),
          participants: z.array(z.object({name: z.string(), seed: z.number()}))
        })
      )
      .mutation(async ({ input }) => {
        const { tournamentUrl, participants } = input;
        participants.sort((a, b) => a.seed - b.seed);
        const response = await fetch(
          `https://api.challonge.com/v1/tournaments/${tournamentUrl}/participants/bulk_add.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              api_key: apiKey,
              participants: participants,
            }),
          }
        );
        const data = await response.json();
        return data;
      }),
});

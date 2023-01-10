import { z } from "zod";
import { env } from "../../../env/server.mjs";
import { router, protectedProcedure, adminProcedure } from "../trpc";

export const tournamentRouter = router({
  getTournaments: protectedProcedure
    .query(({ ctx }) => {
      const tournaments = ctx.prisma.tournament.findMany()
      return tournaments;
    }),
  getTournament: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const tournament = ctx.prisma.tournament.findUnique({
        where: {
          id: input.id
        }
      })
      return tournament;
    }),
  addTournament: adminProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        hostName: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        maxTeams: z.number(),
        region: z.string(),
        type: z.string(),
        organization: z.string()
      })
    )
    .mutation(({ ctx, input }) => {
      const tournament = ctx.prisma.tournament.create({
        data: {
          name: input.name,
          slug: input.name.toLowerCase().replace(/ /g, "-"),
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          hostName: input.hostName,
          maxTeams: input.maxTeams,
          region: input.region,
          type: input.type,
          Organization: {
            connect: {
              id: input.organization
            }
          }
        }
      })
      fetch(env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `New tournament created: ${input.name}`
        })
      })
      return tournament;
    })
});

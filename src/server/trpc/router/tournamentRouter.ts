import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

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
  addTournament: protectedProcedure
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
        admin: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.admin) {
        throw new Error("You are not authorized to create a tournament.");
      }
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
          type: input.type
        }
      })
      return tournament;
    })
});

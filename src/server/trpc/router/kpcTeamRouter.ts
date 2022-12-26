import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const kpcTeamRouter = router({
  getAllTeams: protectedProcedure
    .query(({ ctx }) => {
      const allTeams = ctx.prisma.kPCTeam.findMany()
      return allTeams
    }),
  getTeam: protectedProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(({ ctx, input }) => {
      const team = ctx.prisma.kPCTeam.findUnique({
        where: {
          id: input.id
        }
      })
      return team
    }),
  addTeam: protectedProcedure
    .input(
      z.object({
        teamName: z.string(),
        discordPlayerOne: z.string(),
        discordPlayerTwo: z.string(),
        ignPlayerOne: z.string(),
        ignPlayerTwo: z.string(),
        captain: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const team = ctx.prisma.kPCTeam.create({
        data: {
          teamName: input.teamName,
          discordPlayerOne: input.discordPlayerOne,
          discordPlayerTwo: input.discordPlayerTwo,
          ignPlayerOne: input.ignPlayerOne,
          ignPlayerTwo: input.ignPlayerTwo,
          captain: input.captain
        }
      })
      return team
    })
});

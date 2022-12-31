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
        discordSub: z.string(),
        ignPlayerOne: z.string(),
        ignPlayerTwo: z.string(),
        ignSub: z.string(),
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
          captain: input.captain,
          discordSub: input.discordSub,
          ignSub: input.ignSub,
        }
      })
      return team
    }),
  removeTeam: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        admin: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.admin) {
        throw new Error("You are not authorized to remove a team.");
      }
      const team = ctx.prisma.kPCTeam.delete({
        where: {
          id: input.id
        }
      })
      return team
    }),
  renameTeam: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        teamName: z.string(),
        admin: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.admin) {
        throw new Error("You are not authorized to rename a team.");
      }
      const team = ctx.prisma.kPCTeam.update({
        where: {
          id: input.id
        },
        data: {
          teamName: input.teamName
        }
      })
      return team
    }),
  validateTeam: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        admin: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.admin) {
        throw new Error("You are not authorized to validate a team.");
      }
      const team = ctx.prisma.kPCTeam.update({
        where: {
          id: input.id
        },
        data: {
          validated: true
        }
      })
      return team
    }),
  unvalidateTeam: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        admin: z.boolean()
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.admin) {
        throw new Error("You are not authorized to unvalidate a team.");
      }
      const team = ctx.prisma.kPCTeam.update({
        where: {
          id: input.id
        },
        data: {
          validated: false
        }
      })
      return team
    }),
});

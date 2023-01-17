import { z } from "zod";
import { router, publicProcedure, adminProcedure } from "../trpc";

export const teamRouter = router({
  addTeam2v2: publicProcedure
    .input(
      z.object({
        name: z.string(),
        tournamentId: z.string(),
        discordPlayerOne: z.string(),
        discordPlayerTwo: z.string(),
        ignPlayerOne: z.string(),
        ignPlayerTwo: z.string(),
        discordSub: z.string().optional(),
        ignSub: z.string().optional(),
        captain: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.discordSub && input.ignSub) {

        const team = await ctx.prisma.team.create({
          data: {
            teamName: input.name,
            captain: input.captain,
            players: {
              create: [
                {
                  discordName: input.discordPlayerOne,
                  ign: input.ignPlayerOne,
                },
                {
                  discordName: input.discordPlayerTwo,
                  ign: input.ignPlayerTwo,
                },
              ],
            },
            Sub: {
              create: {
                discordName: input.discordSub,
                ign: input.ignSub,
              },
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              }
            }
          },
        })
        return team
      } else if (!input.discordSub && !input.ignSub) {

        const team = await ctx.prisma.team.create({
          data: {
            teamName: input.name,
            captain: input.captain,
            players: {
              create: [
                {
                  discordName: input.discordPlayerOne,
                  ign: input.ignPlayerOne,
                },
                {
                  discordName: input.discordPlayerTwo,
                  ign: input.ignPlayerTwo,
                },
              ],
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              }
            }
          },
        })
        return team
      } else {
        throw new Error("You must provide both a discord name and ign for your sub")
      }
      
    }),
    addTeam3v3: publicProcedure
    .input(
      z.object({
        name: z.string(),
        tournamentId: z.string(),
        discordPlayerOne: z.string(),
        discordPlayerTwo: z.string(),
        discordPlayerThree: z.string(),
        ignPlayerOne: z.string(),
        ignPlayerTwo: z.string(),
        ignPlayerThree: z.string(),
        discordSub: z.string().optional(),
        ignSub: z.string().optional(),
        captain: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.discordSub && input.ignSub) {

        const team = await ctx.prisma.team.create({
          data: {
            teamName: input.name,
            captain: input.captain,
            players: {
              create: [
                {
                  discordName: input.discordPlayerOne,
                  ign: input.ignPlayerOne,
                },
                {
                  discordName: input.discordPlayerTwo,
                  ign: input.ignPlayerTwo,
                },
                {
                  discordName: input.discordPlayerThree,
                  ign: input.ignPlayerThree,
                },
              ],
            },
            Sub: {
              create: {
                discordName: input.discordSub,
                ign: input.ignSub,
              },
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              }
            }
          },
        })
        
        
        return team
      } else if (!input.discordSub && !input.ignSub) {
        
        const team = await ctx.prisma.team.create({
          data: {
            teamName: input.name,
            captain: input.captain,
            players: {
              create: [
                {
                  discordName: input.discordPlayerOne,
                  ign: input.ignPlayerOne,
                },
                {
                  discordName: input.discordPlayerTwo,
                  ign: input.ignPlayerTwo,
                },
                {
                  discordName: input.discordPlayerThree,
                  ign: input.ignPlayerThree,
                },
              ],
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              }
            }
          },
        })
        return team
      } else {
        throw new Error("You must provide both a discord name and ign for your sub")
      }
    }),
    addTeam4v4: publicProcedure
    .input(
      z.object({
        name: z.string(),
        tournamentId: z.string(),
        discordPlayerOne: z.string(),
        discordPlayerTwo: z.string(),
        discordPlayerThree: z.string(),
        discordPlayerFour: z.string(),
        ignPlayerOne: z.string(),
        ignPlayerTwo: z.string(),
        ignPlayerThree: z.string(),
        ignPlayerFour: z.string(),
        discordSub: z.string().optional(),
        ignSub: z.string().optional(),
        captain: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.discordSub && input.ignSub) {
        
        const team = await ctx.prisma.team.create({
          data: {
            teamName: input.name,
            captain: input.captain,
            players: {
              create: [
                {
                  discordName: input.discordPlayerOne,
                  ign: input.ignPlayerOne,
                },
                {
                  discordName: input.discordPlayerTwo,
                  ign: input.ignPlayerTwo,
                },
                {
                  discordName: input.discordPlayerThree,
                  ign: input.ignPlayerThree,
                },
                {
                  discordName: input.discordPlayerFour,
                  ign: input.ignPlayerFour,
                },
              ],
            },
            Sub: {
              create: {
                discordName: input.discordSub,
                ign: input.ignSub,
              },
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              }
            }
          },
        })

        return team
      } else if (!input.discordSub && !input.ignSub) {
        
        const team = await ctx.prisma.team.create({
          data: {
            teamName: input.name,
            captain: input.captain,
            players: {
              create: [
                {
                  discordName: input.discordPlayerOne,
                  ign: input.ignPlayerOne,
                },
                {
                  discordName: input.discordPlayerTwo,
                  ign: input.ignPlayerTwo,
                },
                {
                  discordName: input.discordPlayerThree,
                  ign: input.ignPlayerThree,
                },
                {
                  discordName: input.discordPlayerFour,
                  ign: input.ignPlayerFour,
                },
              ],
            },
            tournament: {
              connect: {
                id: input.tournamentId,
              }
            }
          },
        })

        return team
      } else {
        throw new Error("You must provide both a discord name and ign for your sub")
      }
    }),
    getTeam: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.findUnique({
        where: {
          id: input.id,
        },
        include: {
          players: true,
          Sub: true,
        },
      })
      return team
    }),
    renameTeam: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.update({
        where: {
          id: input.id,
        },
        data: {
          teamName: input.name,
        },
      })
      return team
    }),
    validateTeam: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.update({
        where: {
          id: input.id,
        },
        data: {
          validated: true,
        },
      })
      return team
    }),
    invalidateTeam: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.update({
        where: {
          id: input.id,
        },
        data: {
          validated: false,
        },
      })
      return team
    }),
    removeTeam: adminProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.delete({
        where: {
          id: input.id,
        },
      })
      return team
    }),
});
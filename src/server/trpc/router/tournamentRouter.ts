import { z } from "zod";
import { router, protectedProcedure, adminProcedure, publicProcedure } from "../trpc";

export const tournamentRouter = router({
  getTournaments: publicProcedure
    .query(async({ ctx }) => {
      const tournaments = await ctx.prisma.tournament.findMany(
        {
          include: {
            Organization: true,
            teams: {
              include: {
                players: true,
                Sub: true
              }
            }
          }
        }
      )
      return tournaments;
    }),
  getTournament: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.findUnique({
        where: {
          id: input.id
        },
        include: {
          teams: {
            include: {
              players: true,
              Sub: true,
              owner: {
                select: {
                  id: true,
                  role: true,
                  name: true,
                }
              }
            }
          },
          Organization: true
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
    .mutation(async({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.create({
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
      return tournament;
    }),
    addBracketLink: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        bracketLink: z.string()
      })
    )
    .mutation(async({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          bracketLink: input.bracketLink
        }
      })
      return tournament;
    }),
    renameTournament: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        name: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          name: input.name,
          slug: input.name.toLowerCase().replace(/ /g, "-")
        }
      })
      return tournament;
    }),
    setTournamentDescription: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        description: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          description: input.description
        }
      })
      return tournament;
    }),
    setTournamentEnded: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        ended: z.boolean()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          ended: input.ended
        }
      })
      return tournament;
    }),
    setSignupsClosed: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        signupsClosed: z.boolean()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          signupsClosed: input.signupsClosed
        }
      })
      return tournament;
    }),
    setType: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        type: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          type: input.type
        }
      })
      return tournament;
    }),
    setMaxTeams: adminProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        maxTeams: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id: input.tournamentId
        },
        data: {
          maxTeams: input.maxTeams
        }
      })
      return tournament;
    }),
});

import { router, protectedProcedure } from "../trpc";

export const tournamentRouter = router({
  getTournaments: protectedProcedure
    .query(({ ctx }) => {
      const tournaments = ctx.prisma.tournament.findMany()
      return tournaments;
    })
});

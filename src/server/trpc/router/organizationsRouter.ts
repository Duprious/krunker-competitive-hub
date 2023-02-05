import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const organizationsRouter = router({
  getAllOrganizations: protectedProcedure
    .query(({ ctx }) => {
      const allOrganizations = ctx.prisma.organization.findMany();
      return allOrganizations;
    }),
  getOrganizationTournaments: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const organizationTournaments = ctx.prisma.organization.findUnique({
        where: {
          name: input.name
        },
        include: {
          tournaments: {
            include: {
              teams: true,
            }
          }
        }
      })
      return organizationTournaments;
    })
});

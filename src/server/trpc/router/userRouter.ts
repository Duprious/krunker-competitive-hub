import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  getUser: protectedProcedure
    .query(({ ctx }) => {
      const userId = ctx.session.user.id;
      const user = ctx.prisma.user.findUnique({
        where: {
          id: userId
        },
        select: {
          id: true,
          name: true,
          role: true,
          image: true,
        }
      })
      return user;
    }),
  getAllUsers: protectedProcedure
    .query(({ ctx }) => {
      const users = ctx.prisma.user.findMany(
        {
          select: {
            id: true,
            name: true,
            role: true,
            image: true,
          }
        }
      );
      return users;
    })
});

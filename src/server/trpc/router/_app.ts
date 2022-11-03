import { router } from "../trpc";
import { authRouter } from "./auth";
import { tournamentRouter } from "./tournamentRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  tournament: tournamentRouter,
  auth: authRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

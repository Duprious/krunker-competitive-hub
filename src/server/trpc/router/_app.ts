import { router } from "../trpc";
import { authRouter } from "./auth";
import { organizationsRouter } from "./organizationsRouter";
import { teamRouter } from "./teamRouter";
import { tournamentRouter } from "./tournamentRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  tournament: tournamentRouter,
  auth: authRouter,
  user: userRouter,
  teamRouter: teamRouter,
  organizations: organizationsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { router } from "../trpc";
import { authRouter } from "./auth";
import { kpcTeamRouter } from "./kpcTeamRouter";
import { organizationsRouter } from "./organizationsRouter";
import { tournamentRouter } from "./tournamentRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  tournament: tournamentRouter,
  auth: authRouter,
  user: userRouter,
  kpcTeam: kpcTeamRouter,
  organizations: organizationsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

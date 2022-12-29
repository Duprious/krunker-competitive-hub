import { router } from "../trpc";
import { authRouter } from "./auth";
import { challongeBracketRouter } from "./challongeBracketRouter";
import { kpcTeamRouter } from "./kpcTeamRouter";
import { tournamentRouter } from "./tournamentRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  tournament: tournamentRouter,
  auth: authRouter,
  user: userRouter,
  kpcTeam: kpcTeamRouter,
  challongeRouter: challongeBracketRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

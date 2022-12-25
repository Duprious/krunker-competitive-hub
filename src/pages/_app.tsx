import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <NextNProgress options={{ showSpinner: false, easing: 'ease'}} />
        <div className="dark dark:bg-gray-900 dark:text-white">
          <Component {...pageProps} />
        </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

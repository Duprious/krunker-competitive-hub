import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Head from "next/head";
import { useStore } from "../zustand/store";
// import AnnouncementBar from "../components/Bars/AnnouncementBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const theme = useStore((state) => state.theme);
  return (
    <SessionProvider session={session}>
      <NextNProgress options={{ showSpinner: false, easing: 'ease'}} />
        <Head>
          <title>Krunker Competitive Hub</title>
          <meta name="description" content="All info on Competitive Krunker here" />
          <meta property="og:url" content="https://kch.vercel.app/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Krunker Competitive Hub" />
          <meta property="og:description" content="All info on Competitive Krunker here" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image" content="https://i.ibb.co/KLzJbYg/JTz-Oke7a-2x.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="kch.vercel.app" />
          <meta property="twitter:url" content="https://kch.vercel.app/" />
          <meta name="twitter:title" content="Krunker Competitive Hub" />
          <meta name="twitter:description" content="All info on Competitive Krunker here" />
          <meta name="twitter:image" content="https://i.ibb.co/KLzJbYg/JTz-Oke7a-2x.png" />
        </Head>
        <div className={`${theme === "light" ? "bg-[#E7E7E7] text-gray-900" : "dark bg-gray-900 text-white"}`}>
          {/* <AnnouncementBar /> */}
          <Component {...pageProps} />
        </div>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

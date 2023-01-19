import { GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import Image from "next/image";
import krunkerEsportsImage from '../../public/krunkeresports.png'
import { FaLock, FaDiscord } from 'react-icons/fa'
import { getServerAuthSession } from "../server/common/get-server-auth-session";
import Footer from "../components/Bars/Footer/Footer";

const Login: NextPage = () => {

  return (
    <>
      <Head>
        <title>Krunker Competitive Hub</title>
        <meta name="description" content="All info on Comp Krunker here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-center text-5xl font-bold text-indigo-500 md:text-6xl">
        Krunker Competitive Hub
        </h1>
        <div className="w-full max-w-md space-y-8">
          <div className="pt-12 flex flex-col justify-center items-center">
            <Image
              className=""
              src={krunkerEsportsImage}
              alt="Krunker Competitive Hub"
              width={250}
              height={250}
            />
            <h2 className="mt-10 mb-6 text-center text-3xl font-bold tracking-tighttext-gray-100">
              Sign in to your Discord Account
            </h2>
          </div>

          <div>
            <button
              onClick={() => signIn("discord")}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <FaLock
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                <FaDiscord
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)
  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Login;
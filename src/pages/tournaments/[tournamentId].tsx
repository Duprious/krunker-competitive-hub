import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import BracketLinkModal from '../../components/Modals/BracketLinkModal'
import TournamentTab from '../../components/Tabs/TournamentTab'
import { trpc } from '../../utils/trpc'
import { useStore } from '../../zustand/store'

const TournamentPage: NextPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: userData} = trpc.user.getUser.useQuery()
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query})
  const toggleBracketLinkModal = useStore(state => state.toggleBracketLinkModal)


  return (
    <Layout>
      <BracketLinkModal tournamentId={query} />
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                {tournamentData?.name}
              </h1>
              <div className="md:mr-8 mt-4 text-center text-lg text-teal-500 font-medium">
                {userData && userData?.role === "ADMIN" ?
                  <button onClick={toggleBracketLinkModal} type="button" className="text-white mt-4 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800">
                    Add Bracket
                  </button>
                :
                null  
              }
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className='flex flex-col pt-6'>
            <TournamentTab
              description={tournamentData?.description}
              hostName={tournamentData?.hostName}
              startDate={tournamentData?.startDate}
              id={tournamentData?.id}
              region={tournamentData?.region}
              type={tournamentData?.type}
              bracketLink={tournamentData?.bracketLink}
              />
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default TournamentPage
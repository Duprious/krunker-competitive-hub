import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Layout from '../../../../../../components/Layout'
import { getServerAuthSession } from '../../../../../../server/common/get-server-auth-session'
import { trpc } from '../../../../../../utils/trpc'

const TournamentEditPage = () => {
  const router = useRouter()
  const query = router.query.tournamentId as string
  const { data: tournamentData } = trpc.tournament.getTournament.useQuery({id: query});
  const { data: userData } = trpc.user.getUser.useQuery();
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [type, setType] = React.useState("")
  const [maxTeams, setMaxTeams] = React.useState(tournamentData?.maxTeams)
  const renameTournamentMutation = trpc.tournament.renameTournament.useMutation()
  const updateDescriptionMutation = trpc.tournament.setTournamentDescription.useMutation()
  const updateTypeMutation = trpc.tournament.setType.useMutation()
  const updateTournamentEndedMutation = trpc.tournament.setTournamentEnded.useMutation()
  const updateSignupsClosedMutation = trpc.tournament.setSignupsClosed.useMutation()
  const updateMaxTeamsMutation = trpc.tournament.setMaxTeams.useMutation()
  const utils = trpc.useContext()

  const handleRename = async () => {
    if (name === "") return toast.error("Please enter a name")
    await renameTournamentMutation.mutateAsync({tournamentId: query, name: name}, {
      onSuccess: () => {
        toast.success("Successfully updated tournament name")
      },
    })
    utils.invalidate()
  }

  const handleUpdateDescription = async () => {
    if (description === "") return toast.error("Please enter a description")
    await updateDescriptionMutation.mutateAsync({tournamentId: query, description: description}, {
      onSuccess: () => {
        toast.success("Successfully updated tournament description")
      },
    })
    utils.invalidate()
  }

  const handleUpdateType = async () => {
    if (type === "") return toast.error("Please enter a type")
    await updateTypeMutation.mutateAsync({tournamentId: query, type: type}, {
      onSuccess: () => {
        toast.success("Successfully updated tournament type")
      },
    })
    utils.invalidate()
  }

  const handleTournamentEnded = async () => {
    if (tournamentData?.ended === true) {
      await updateTournamentEndedMutation.mutateAsync({tournamentId: query, ended: false}, {
        onSuccess: () => {
          toast.success("Successfully opened tournament")
        },
      })
    } else {
      await updateTournamentEndedMutation.mutateAsync({tournamentId: query, ended: true}, {
        onSuccess: () => {
          toast.success("Successfully closed tournament")
        },
      })
    }
    utils.invalidate()
  }

  const handleSignupsClosed = async () => {
    if (tournamentData?.signupsClosed === true) {
      await updateSignupsClosedMutation.mutateAsync({tournamentId: query, signupsClosed: false}, {
        onSuccess: () => {
          toast.success("Successfully opened signups")
        },
      })
    } else {
      await updateSignupsClosedMutation.mutateAsync({tournamentId: query, signupsClosed: true}, {
        onSuccess: () => {
          toast.success("Successfully closed signups")
        },
      })
    }
    utils.invalidate()
  }

  const handleUpdateMaxTeams = async () => {
    if (maxTeams === tournamentData?.maxTeams) return toast.error("Please enter a new amount of max teams")
    if (maxTeams && maxTeams < 2) return toast.error("Max teams must be at least 2")
    await updateMaxTeamsMutation.mutateAsync({tournamentId: query, maxTeams: maxTeams || 1}, {
      onSuccess: () => {
        toast.success("Successfully updated max teams")
      },
    })
    utils.invalidate()
  }

  return (
    <Layout>
      <Toaster />
      {userData?.role === 'ADMIN' ?
      <main className="container mx-auto flex flex-col justify-start p-4">
        <section>
          <div className="pt-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row">
              <h1 className="text-center text-5xl font-semibold md:ml-8 md:text-start">
                Edit Tournament {tournamentData?.name}
                <p className='text-xl text-red-500 mt-3'>(Admin)</p>
              </h1>
            </div>
            <hr className="mt-10" />
          </div>
        </section>
        <section>
          <div className='pt-10 flex flex-col gap-8'>
            <div className='flex flex-row gap-4 items-center'>
              <label className='text-xl font-semibold'>Tournament Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className='border-2 border-gray-300 p-2 rounded-md max-w-xl w-full text-black' type='text' placeholder={tournamentData?.name} />
              <button onClick={() => handleRename()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update</button>
            </div>
            <hr />
            <div className='flex flex-row gap-4 items-center'>
              <label className='text-xl font-semibold'>Tournament Description</label>
              <input value={description} onChange={(e) => setDescription(e.target.value)} className='border-2 border-gray-300 p-2 rounded-md max-w-xl w-full text-black' type='text' placeholder={tournamentData?.description} />
              <button onClick={() => handleUpdateDescription()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update</button>
            </div>
            <hr />
            <div className='flex flex-col gap-2'>
              <div>
                <label className='text-xl font-semibold'>Current Tournament Type: {tournamentData?.type}</label>
              </div>
              <div className='flex flex-row gap-4 items-center'>
                <label className='text-xl font-semibold'>Tournament Type</label>
                {tournamentData?.type === "2v2"
                ? <select value={type} onChange={(e) => setType(e.target.value)} className='border-2 border-gray-300 max-w-xs w-full p-2 rounded-md text-black'>
                    <option value='2v2'>2v2</option>
                    <option value='3v3'>3v3</option>
                    <option value='4v4'>4v4</option>
                  </select>
                : tournamentData?.type === "3v3"
                ? <select value={type} onChange={(e) => setType(e.target.value)} className='border-2 border-gray-300 max-w-xs w-full p-2 rounded-md text-black'>
                    <option value='3v3'>3v3</option>
                    <option value='2v2'>2v2</option>
                    <option value='4v4'>4v4</option>
                  </select>
                : <select value={type} onChange={(e) => setType(e.target.value)} className='border-2 border-gray-300 max-w-xs w-full p-2 rounded-md text-black'>
                    <option value='4v4'>4v4</option>
                    <option value='2v2'>2v2</option>
                    <option value='3v3'>3v3</option>
                  </select>
                }
                <button onClick={() => handleUpdateType()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update</button>
              </div>
              <div>
                <label className='text-xl text-red-400 font-semibold'>Make sure to remove every team before changing tournament type</label>
              </div>
            </div>
            <hr />
            <div className='flex flex-col gap-8'>
              <div>
                <label className='text-xl font-semibold'>Current Tournament Max Teams: {tournamentData?.maxTeams}</label>
              </div>
              <div className='flex flex-row gap-4 items-center'>
                <label className='text-xl font-semibold'>Tournament Max Teams</label>
                <input value={maxTeams} onChange={(e) => setMaxTeams(e.target.valueAsNumber)} className='border-2 border-gray-300 p-2 rounded-md max-w-xl w-full text-black' type='number' placeholder={tournamentData?.maxTeams.toString()} />
                <button onClick={() => handleUpdateMaxTeams()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Update</button>
              </div>
            </div>
            <hr />
            <div className='flex flex-row gap-4 items-center'>
              {tournamentData?.ended 
              ? <label className='text-xl font-semibold'>Tournament: Ended</label>
              : <label className='text-xl font-semibold'>Tournament: Not Ended</label>
              }
              {tournamentData?.ended 
              ? <button onClick={() => handleTournamentEnded()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Open Tournament</button>
              : <button onClick={() => handleTournamentEnded()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>End Tournament</button>
              }
            </div>
            <hr />
            <div className='flex flex-row gap-4 items-center'>
              {tournamentData?.signupsClosed
              ? <label className='text-xl font-semibold'>Signups: Closed</label>
              : <label className='text-xl font-semibold'>Signups: Open</label>
              }
              {tournamentData?.signupsClosed
              ? <button onClick={() => handleSignupsClosed()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Open Signups</button>
              : <button onClick={() => handleSignupsClosed()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Close Signups</button>
              }
            </div>
            <hr />
            <div className='flex flex-row gap-4 items-center'>
              <label className='text-xl font-semibold'>For the bracket link, go to the tournament page</label>
            </div>
          </div>
        </section>
      </main>
      :
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-100">You are not an admin</h1>
        <p className="text-gray-400">You are not authorized to see this page</p>
        <Link href="/home">
          <p className="text-blue-500 hover:underline">Return to the homepage</p>
        </Link>
      </div>
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default TournamentEditPage
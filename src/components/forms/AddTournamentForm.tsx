import { useRouter } from 'next/router'
import React, {useState } from 'react'
import { trpc } from '../../utils/trpc'
import { toast, Toaster } from 'react-hot-toast'

const AddTournamentForm = () => {

  const router = useRouter()
  const tournamentMutation = trpc.tournament.addTournament.useMutation()
  const { data: tournamentsData } = trpc.tournament.getTournaments.useQuery()

  let today = new Date()
  let tomorrow = new Date()
  let dayAfterTomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  dayAfterTomorrow.setDate(today.getDate() + 2)

  const [tournamentName, setTournamentName] = useState("")
  const [tournamentDescription, setTournamentDescription] = useState("")
  const [tournamentHostName, setTournamentHostName] = useState("")
  const [tournamentMaxTeams, setTournamentMaxTeams] = useState(8)
  const [tournamentStartDate, setTournamentStartDate] = useState(tomorrow)
  const [tournamentEndDate, setTournamentEndDate] = useState(dayAfterTomorrow)
  const [tournamentType, setTournamentType] = useState("4v4")
  const [tournamentServer, setTournamentServer] = useState("EU")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (tournamentsData?.find(tournament => tournament.name === tournamentName)) {
      toast.error("Tournament with that name already exists")
      return
    }
    
    tournamentMutation.mutateAsync({
      name: tournamentName,
      description: tournamentDescription,
      hostName: tournamentHostName,
      maxTeams: tournamentMaxTeams,
      startDate: tournamentStartDate,
      endDate: tournamentEndDate,
      region: tournamentServer.split(" ")[0] || "UKN",
      type: tournamentType,
    }, {
      onSuccess: () => {
        router.push('/tournaments')
        toast.success("Tournament created")
      }
    })
  }
  
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="relative z-0 mb-6 w-full group">
            <input value={tournamentName} onChange={(e) => setTournamentName(e.target.value)} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tournament Name</label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
            <input value={tournamentDescription} onChange={(e) => setTournamentDescription(e.target.value)} type="text" name="description" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
              <input value={tournamentHostName} onChange={(e) => setTournamentHostName(e.target.value)} type="text" name="hostName" id="hostName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="hostName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Host (Username)</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
              <input value={tournamentMaxTeams} onChange={(e) => setTournamentMaxTeams(e.target.valueAsNumber)} type="number" name="maxTeams" id="maxTeams" min={0} max={64} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="maxTeams" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Max Teams</label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input value={tournamentStartDate.toISOString().substring(0, 16)} onChange={(e) => setTournamentStartDate(new Date(e.target.value))} type="datetime-local" name="startDate" id="startDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="startDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input value={tournamentEndDate.toISOString().substring(0, 16)} onChange={(e) => setTournamentEndDate(new Date(e.target.value))} type="datetime-local" name="endDate" id="endDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="endDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select Tournament Type</label>
            <select value={tournamentType} onChange={(e) => setTournamentType(e.target.value)} id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option>4v4</option>
              <option>3v3</option>
              <option>2v2</option>
              <option>1v1</option>
            </select>
          </div>
          <div className="relative z-0 mb-6 w-full group">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select Tournament Server</label>
            <select value={tournamentServer} onChange={(e) => setTournamentServer(e.target.value)} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option>EU | FRA</option>
              <option>NA | NY</option>
              <option>NA | MIA</option>
              <option>NA | DAL</option>
              <option>NA | SV</option>
              <option>NA | HAW</option>
              <option>ASIA | SG</option>
              <option>ASIA | IND</option>
              <option>ASIA | SK</option>
              <option>ASIA | TOK</option>
              <option>OCE | SYD</option>
              <option>AF | SA</option>
              <option>SA | BR</option>
              <option>ME</option>
            </select>
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
      <Toaster />
    </>
  )
}

export default AddTournamentForm
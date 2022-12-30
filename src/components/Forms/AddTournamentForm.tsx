import { useRouter } from 'next/router'
import React from 'react'
import { trpc } from '../../utils/trpc'
import { toast, Toaster } from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form/dist/types'

const addTournamentSchema = z
  .object({
    name: z.string().min(1, {message: "Tournament name is required"}).max(50, {message: "Tournament name can't exceed 50 letters"}),
    description: z.string().min(8, {message: "Tournament description must be atleast 8 letters long" }).max(100, {message: "Tournament description can't exceed 100 letters"}),
    hostName: z.string().min(1, {message: "Hostname is required"}).max(50, {message: "Hostname can't exceed 50 letters"}),
    maxTeams: z.number().min(2, {message: "There's a minimum of 2 teams required"}).max(64, {message: "There's a maximum of 64 teams allowed"}),
    dates: z.object({
      startDate: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg)
      }, z.date().min(new Date(), {message: "Start date must be in the future"})),
      endDate: z.preprocess((arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg)
      }, z.date().min(new Date(), {message: "Start date must be in the future"})),
    }).refine(data => data.startDate < data.endDate, {message: "End date must be after the start date"}),
    region: z.string(),
    type: z.string(),
  })

type AddTournamentSchema = z.infer<typeof addTournamentSchema>

const AddTournamentForm = () => {

  const router = useRouter()
  const tournamentMutation = trpc.tournament.addTournament.useMutation()
  const { data: tournamentsData } = trpc.tournament.getTournaments.useQuery()
  const { data: userData } = trpc.user.getUser.useQuery()

  const { register, handleSubmit, formState: {errors} } = useForm<AddTournamentSchema>({
    resolver: zodResolver(addTournamentSchema)
  });

  const onSubmit: SubmitHandler<AddTournamentSchema> = (data) => {

    if (tournamentsData?.find(tournament => tournament.name === data.name)) {
      toast.error("Tournament with that name already exists")
      return
    }

    tournamentMutation.mutateAsync({
      name: data.name,
      description: data.description,
      hostName: data.hostName,
      maxTeams: data.maxTeams,
      startDate: data.dates.startDate,
      endDate: data.dates.endDate,
      region: data.region.split(" ")[0] || "UKN",
      type: data.type,
      admin: userData?.role === "ADMIN" ? true : false
    }, {
      onSuccess: () => {
        router.push('/tournaments')
        toast.success("Tournament created")
      },
      onError: () => {
        toast.error("Couldn't add the tournament")
      }
    })
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" id="name" className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("name")} />
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Tournament Name</label>
            {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="relative z-0 mb-6 w-full group">
            <input type="text" id="description" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("description")} />
            <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
            {errors.description && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.description?.message}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
              <input type="text" id="hostName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("hostName")} />
              <label htmlFor="hostName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Host (Organizer Name)</label>
              {errors.hostName && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.hostName?.message}
                </p>
              )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
              <input type="number" id="maxTeams" min={0} max={64} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("maxTeams", { setValueAs: (v) => v === "" ? undefined : parseInt(v, 10) })} />
              <label htmlFor="maxTeams" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Max Teams</label>
              {errors.maxTeams && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.maxTeams?.message}
                </p>
              )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input type="datetime-local" id="startDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("dates.startDate")} />
            <label htmlFor="startDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Start Date</label>
            {errors.dates?.startDate && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.dates.startDate?.message}
            </p>
          )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="datetime-local" id="endDate" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " {...register("dates.endDate")} />
            <label htmlFor="endDate" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">End Date</label>
            {errors.dates?.endDate && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.dates.endDate?.message}
            </p>
          )}
          {errors.dates && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.dates?.message}
            </p>
          )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select Tournament Type</label>
            <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("type")} >
              <option>4v4</option>
              <option>3v3</option>
              <option>2v2</option>
              <option>1v1</option>
            </select>
            {errors.type && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.type?.message}
              </p>
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
          <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select Tournament Server</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("region")} >
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
            {errors.region && (
              <p className="text-xs italic text-red-500 mt-2">
                {errors.region?.message}
              </p>
            )}
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
      <Toaster />
    </>
  )
}

export default AddTournamentForm
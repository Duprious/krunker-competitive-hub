import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { trpc } from '../../utils/trpc'

const registerTeamSchema = z
  .object({
    teamName: z.string().min(1, {message: "Team name is required"}).max(16, {message: "Team name cannot exceed 16 characters"}),
    discordPlayerOne: z.string().min(1, {message: "Discord username with tag is required"}).max(32, {message: "Discord name cannot exceed 32 characters"}),
    discordPlayerTwo: z.string().min(1, {message: "Discord username with tag is required"}).max(32, {message: "Discord name cannot exceed 32 characters"}),
    ignPlayerOne: z.string().min(1, {message: "Krunker username is required"}).max(48, {message: "Krunker username cannot exceed 48 characters"}),
    ignPlayerTwo: z.string().min(1, {message: "Krunker username is required"}).max(48, {message: "Krunker username cannot exceed 48 characters"}),
    captain: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({message: "You must accept the tournament rules"})
    })
  })

type RegisterTeamSchema = z.infer<typeof registerTeamSchema>

const KPCSignupForm = () => {

  const router = useRouter()
  const teamMutation = trpc.kpcTeam.addTeam.useMutation()
  const { data: allTeamsData } = trpc.kpcTeam.getAllTeams.useQuery()

  const { register, handleSubmit, formState: {errors} } = useForm<RegisterTeamSchema>({
    resolver: zodResolver(registerTeamSchema)
  });

  const onSubmit: SubmitHandler<RegisterTeamSchema> = (data) => {

    if (allTeamsData?.find(team => team.teamName === data.teamName)) {
      toast.error("Team with that name already exists")
      return
    }

    if ((allTeamsData?.find(team => team.discordPlayerOne === data.discordPlayerOne)) || allTeamsData?.find(team => team.discordPlayerTwo === data.discordPlayerTwo) || allTeamsData?.find(team => team.ignPlayerOne === data.ignPlayerOne) || allTeamsData?.find(team => team.ignPlayerTwo === data.ignPlayerTwo)) {
      toast.error(`One of the players is already signed up for the tournament`)
      return
    }

    teamMutation.mutateAsync({
      teamName: data.teamName,
      discordPlayerOne: data.discordPlayerOne,
      discordPlayerTwo: data.discordPlayerTwo,
      ignPlayerOne: data.ignPlayerOne,
      ignPlayerTwo: data.ignPlayerTwo,
      captain: data.captain,
    }, {
      onSuccess: () => {
        router.push('/home')
        toast.success('Succesfully signed up your team')
      },
      onError: () => {
        toast.error("Couldn't sign up your team. Please contact an Admin on Discord")
      }
    })
  }

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center pl-16 justify-center px-6 py-8 mx-auto md:mt-8 lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        General Info
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <label htmlFor="teamName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                          <input type="teamName" id="teamName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Krunker" {...register("teamName")} />
                          {errors.teamName && (
                            <p className="text-xs italic text-red-500 mt-2">
                              {errors.teamName?.message}
                            </p>
                          )}
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Players
                        </h1>
                        <div className='grid grid-cols-2 space-x-8'>
                          <div>
                            <label htmlFor="playerOneDiscord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discord Player 1 (with #)</label>
                            <input type="text" id="playerOneDiscord" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Duprious#1459' {...register("discordPlayerOne")} />
                            {errors.discordPlayerOne && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.discordPlayerOne?.message}
                              </p>
                            )}
                            <label htmlFor="playerTwoDiscord" className="block mb-2 text-sm font-medium mt-4 text-gray-900 dark:text-white">Discord Player 2 (with #)</label>
                            <input type="text" id="playerTwoDiscord" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='flipbait#0001' {...register("discordPlayerTwo")} />
                            {errors.discordPlayerTwo && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.discordPlayerTwo?.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="playerOneIGN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IGN Player 1 (Krunker)</label>
                            <input type="text" id="playerOneIGN" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Duprious' {...register("ignPlayerOne")} />
                            {errors.ignPlayerOne && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.ignPlayerOne?.message}
                              </p>
                            )}
                            <label htmlFor="playerTwoIGN" className="block mb-2 text-sm font-medium mt-4 text-gray-900 dark:text-white">IGN Player 2 (Krunker)</label>
                            <input type="text" id="playerTwoIGN" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='flipbait' {...register("ignPlayerTwo")} />
                            {errors.ignPlayerTwo && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.ignPlayerTwo?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                        <label htmlFor="teamCaptain" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the team captain</label>
                        <select id="teamCaptain" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("captain")}>
                          <option value="P1">Player 1</option>
                          <option value="P2">Player 2</option>
                        </select>
                        {errors.captain && (
                          <p className="text-xs italic text-red-500 mt-2">
                            {errors.captain?.message}
                          </p>
                        )}
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" {...register("terms")} />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I agree to the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" rel="noopener noreferrer" target="_blank" href="https://docs.google.com/document/d/1e25it0ihjx2gNli-rVt86f3BfzvFwW6VBPUJPNgyKLQ/edit?usp=sharing">Tournament Rules</a></label>
                              {errors.terms && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.terms?.message}
                              </p>
                              )}
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default KPCSignupForm
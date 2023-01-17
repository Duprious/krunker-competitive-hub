import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { trpc } from '../../utils/trpc'

const registerTeamSchema = z
  .object({
    teamName: z.string().min(1, {message: "Team name is required"}).max(16, {message: "Team name cannot exceed 16 characters"}),
    discordPlayerOne: z.string().min(1, {message: "Discord username with tag is required"}).max(48, {message: "Discord name cannot exceed 48 characters"}),
    discordPlayerTwo: z.string().min(1, {message: "Discord username with tag is required"}).max(48, {message: "Discord name cannot exceed 48 characters"}),
    ignPlayerOne: z.string().min(1, {message: "Krunker username is required"}).max(48, {message: "Krunker username cannot exceed 48 characters"}),
    ignPlayerTwo: z.string().min(1, {message: "Krunker username is required"}).max(48, {message: "Krunker username cannot exceed 48 characters"}),
    discordSub: z.string().max(48, {message: "Discord name cannot exceed 48 characters"}).optional(),
    ignSub: z.string().max(48, {message: "Krunker username cannot exceed 48 characters"}).optional(),
    captain: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({message: "You must accept the tournament rules"})
    })
  })

type RegisterTeamSchema = z.infer<typeof registerTeamSchema>

const TwoVsTwoSignupForm = ({tournamentId}: {tournamentId: string}) => {
  const addTwoVsTwoTeam = trpc.teamRouter.addTeam2v2.useMutation()
  const router = useRouter()

  const { register, handleSubmit, formState: {errors} } = useForm<RegisterTeamSchema>({
    resolver: zodResolver(registerTeamSchema)
  });

  const onSubmit: SubmitHandler<RegisterTeamSchema> = async (data) => {
    await addTwoVsTwoTeam.mutateAsync({
      tournamentId: tournamentId,
      name: data.teamName,
      discordPlayerOne: data.discordPlayerOne,
      discordPlayerTwo: data.discordPlayerTwo,
      ignPlayerOne: data.ignPlayerOne,
      ignPlayerTwo: data.ignPlayerTwo,
      discordSub: data.discordSub,
      ignSub: data.ignSub,
      captain: data.captain,
    }, {
      onSuccess: () => {
        toast.success("Team registered successfully")
        router.push(`/tournaments/${tournamentId}/teams`)
      },
      onError: () => {
        toast.error("An error occurred while registering your team. Please try again later.")
      }
    })
  }

  return (
    <div>
      <section className="bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:mt-12 lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-5xl xl:p-0 bg-gray-800 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        General Info
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <label htmlFor="teamName" className="block mb-2 text-sm font-mediumtext-white">Team Name</label>
                          <input type="teamName" id="teamName" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Krunker" {...register("teamName")} />
                          {errors.teamName && (
                            <p className="text-xs italic text-red-500 mt-2">
                              {errors.teamName?.message}
                            </p>
                          )}
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                        Players (if no sub, leave sub field blank)
                        </h1>
                        <div className='grid grid-cols-2 space-x-8'>
                          <div>
                            <label htmlFor="playerOneDiscord" className="block mb-2 text-sm font-medium text-white">Discord Player 1 (with #)</label>
                            <input type="text" id="playerOneDiscord" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder='Duprious#1459' {...register("discordPlayerOne")} />
                            {errors.discordPlayerOne && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.discordPlayerOne?.message}
                              </p>
                            )}
                            <label htmlFor="playerTwoDiscord" className="block mb-2 text-sm font-medium mt-4 text-white">Discord Player 2</label>
                            <input type="text" id="playerTwoDiscord" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder='flipbait#0001' {...register("discordPlayerTwo")} />
                            {errors.discordPlayerTwo && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.discordPlayerTwo?.message}
                              </p>
                            )}
                            <label htmlFor="subDiscord" className="block mb-2 mt-4 text-sm font-medium text-white">Discord Sub</label>
                            <input type="text" id="subDiscord" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder='Duprious#1459' {...register("discordSub")} />
                            {errors.discordSub && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.discordSub?.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <label htmlFor="playerOneIGN" className="block mb-2 text-sm font-medium text-white">IGN Player 1 (Krunker)</label>
                            <input type="text" id="playerOneIGN" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder='Duprious' {...register("ignPlayerOne")} />
                            {errors.ignPlayerOne && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.ignPlayerOne?.message}
                              </p>
                            )}
                            <label htmlFor="playerTwoIGN" className="block mb-2 text-sm font-medium mt-4 text-white">IGN Player 2</label>
                            <input type="text" id="playerTwoIGN" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder='flipbait' {...register("ignPlayerTwo")} />
                            {errors.ignPlayerTwo && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.ignPlayerTwo?.message}
                              </p>
                            )}
                            <label htmlFor="subIGN" className="block mb-2 text-sm font-medium mt-4 text-white">IGN Sub</label>
                            <input type="text" id="subIGN" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder='flipbait' {...register("ignSub")} />
                            {errors.ignSub && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.ignSub?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div>
                        <label htmlFor="teamCaptain" className="block mb-2 text-sm font-medium text-white">Select the team captain</label>
                        <select id="teamCaptain" className="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" {...register("captain")}>
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
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border rounded focus:ring-3 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" {...register("terms")} />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-300">I agree to the <a className="font-medium hover:underline text-primary-500" rel="noopener noreferrer" target="_blank" href="https://docs.google.com/document/d/1e25it0ihjx2gNli-rVt86f3BfzvFwW6VBPUJPNgyKLQ/edit?usp=sharing">Tournament Rules</a></label>
                              {errors.terms && (
                              <p className="text-xs italic text-red-500 mt-2">
                                {errors.terms?.message}
                              </p>
                              )}
                            </div>
                        </div>
                        <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
      </section>
    </div>
  )
}

export default TwoVsTwoSignupForm
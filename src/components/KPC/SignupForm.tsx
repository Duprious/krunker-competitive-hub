import React from 'react'

const KPCSignupForm = () => {
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center pl-16 justify-center px-6 py-8 mx-auto md:mt-16 lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        General Info
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="teamName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                            <input type="teamName" name="teamName" id="teamName" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Krunker" required />
                        </div>
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Players
                        </h1>
                        <div className='grid grid-cols-2 space-x-8'>
                          <div>
                            <label htmlFor="playeerOneDiscord" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discord Player 1</label>
                            <input type="text" name="playeerOneDiscord" id="playeerOneDiscord" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Duprious#1459' required />
                            <label htmlFor="playerTwoDiscord" className="block mb-2 text-sm font-medium mt-4 text-gray-900 dark:text-white">Discord Player 2</label>
                            <input type="text" name="playerTwoDiscord" id="playerTwoDiscord" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='flipbait#0001' required />
                          </div>
                          <div>
                          <label htmlFor="playerOneIGN" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IGN Player 1</label>
                            <input type="text" name="playerOneIGN" id="playerOneIGN" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Duprious' required />
                            <label htmlFor="playerTwoIGN" className="block mb-2 text-sm font-medium mt-4 text-gray-900 dark:text-white">IGN Player 2</label>
                            <input type="text" name="playerTwoIGN" id="playerTwoIGN" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='flipbait' required />
                          </div>
                        </div>
                        <div>
                        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select the team captain</label>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option value="US">Player 1</option>
                          <option value="CA">Player 2</option>
                        </select>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I agree to the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Tournament Rules</a></label>
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
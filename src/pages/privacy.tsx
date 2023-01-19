import React from 'react'

const PrivacyPolicy = () => {
  return (
      <div className="flex flex-col items-center justify-center w-full min-h-screen py-2">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-6 space-y-4 text-center">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-lg text-gray-400">
            This privacy policy will help you understand how Krunker Competitive Hub uses and protects the data you provide to us when you visit and use Krunker Competitive Hub.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-6 space-y-4 text-left">
          <h2 className="text-2xl font-bold">What data do we collect?</h2>
          <p className="text-lg text-gray-400">
            When you visit the website, we may collect the following data:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-400">
            <li>Your Discord Username, Avatar and Email address.</li>
            <li>Information you provide us on our website</li>
          </ul>
          <p className="text-lg text-gray-400">
            We may also collect your data through the use of cookies. Cookies are small files saved to your computer&apos;s hard drive that save your authentication data. This allows us to remember you when you return to our website and to keep you logged in.
          </p>
          <p className="text-lg text-gray-400">
            You can choose to enable or disable cookies in your web browser. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-6 space-y-4 text-left">
          <h2 className="text-2xl font-bold">How do we use your data?</h2>
          <p className="text-lg text-gray-400">
            We collect your data so that we can:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-400">
            <li>Improve our website.</li>
            <li>Contact you regarding your account on our website.</li>
          </ul>
          <p className="text-lg text-gray-400">
            Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
          </p>
          <p className="text-lg text-gray-400">
            You are free to refuse our request for your data, with the understanding that we are unable to provide you with our services.
          </p>
          <p className="text-lg text-gray-400">
            Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us at <span className='font-semibold text-white'>info@kchub.net</span>.
          </p>
          <p className="text-lg text-gray-400">
            This policy is effective as of January 1st 2023.
          </p>
        </div>
      </div>
  )
}

export default PrivacyPolicy
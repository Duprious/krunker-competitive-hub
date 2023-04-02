import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import krunkerIcon from '../../../public/krunkericon.png'
import React, { Fragment } from 'react'
import Link from 'next/link'
import { trpc } from '../../utils/trpc'
import { signOut } from 'next-auth/react'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import { useStore } from '../../zustand/store'
import { Roboto_Condensed } from '@next/font/google'

const roboto = Roboto_Condensed({
  subsets: ['latin'],
  weight: '700'
})

const Navbar = ({activeRoute}: {activeRoute: string}) => {

  const navigation = [
    { name: 'HOME', href: '/home', current: activeRoute.startsWith('/home')},
    { name: 'PLAYERS', href: '/players', current: activeRoute.startsWith('/players') || activeRoute.startsWith('/player')},
    { name: 'PRIVACY', href: '/privacy', current: activeRoute.startsWith('/privacy')},
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const {data: userData, error, isLoading} = trpc.user.getUser.useQuery();
  const theme = useStore((state) => state.theme);
  const toggleTheme = useStore((state) => state.toggleTheme);

  const handleToggleTheme = () => {
    if (theme === "dark") {
      localStorage.setItem("preferredTheme", "light")
    }

    if (theme === "light") {
      localStorage.setItem("preferredTheme", "dark")
    }

    toggleTheme()
  }

  return (
    !userData ? 
      <Disclosure as="nav" className="dark:bg-gray-800 bg-[#FFD449] sticky w-full top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Link href={"/home"}>
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={krunkerIcon.src}
                      alt="Krunker Comp Icon"
                      />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={krunkerIcon.src}
                      alt="Krunker Comp Icon"
                      />
                  </div>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <Link
                      className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" href={'/'}>
                      Sign in
                    </Link>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className='flex justify-between items-center gap-4'>
                    {theme === 'dark' ? 
                    <button onClick={() => handleToggleTheme()} className='flex items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Toggle Theme</span>
                      <BsSunFill className='h-6 w-6 text-yellow-300' />
                    </button>
                    :
                    <button onClick={() => handleToggleTheme()} className='flex items-center justify-center rounded-full bg-[#fed549] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Toggle Theme</span>
                      <BsMoonFill className='h-6 w-6 text-slate-700' />
                    </button>

                    }
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        <div className='bg-gray-100 block px-4 py-2 text-sm text-gray-700'>
                          Not logged in
                        </div>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      `${roboto.className} text-gray-900 hover:text-gray-500`,
                      'block px-3 py-2 rounded-md text-base font-medium cursor-pointer'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    :
    <Disclosure as="nav" className="dark:bg-gray-800 bg-[#FFD449] sticky w-full top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={krunkerIcon.src}
                    alt="Krunker Comp Icon"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={krunkerIcon.src}
                    alt="Krunker Comp Icon"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link className={classNames(
                      item.current 
                      ? `${theme === "dark" ? `${roboto.className} text-gray-300 hover:text-bg-700 hover:text-white underline underline-offset-8`: `${roboto.className} text-gray-900 hover:text-gray-500 underline underline-offset-8`}`
                      : `${theme === "dark" ? `${roboto.className} text-gray-300 hover:text-bg-700 hover:text-white`: `${roboto.className} text-gray-900 hover:text-gray-500`}`,
                      'px-3 py-2 rounded-md font-semibold text-xl'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      key={item.name} 
                      href={item.href}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {userData?.role === "ADMIN" && (
                      <Link className={classNames(
                      `${theme === "dark" ? `${roboto.className} text-gray-300 hover:text-bg-700 hover:text-white ${activeRoute.startsWith('/admin') ? "underline underline-offset-4" : ""}` : `${roboto.className} text-gray-900 hover:text-gray-500 ${activeRoute.startsWith('/admin') ? "underline underline-offset-4" : ""}`}`,
                      'px-3 py-2 rounded-md font-semibold text-xl'
                      )}
                      key="Admin Panel"
                      href="/admin/organizations"
                      >
                        ADMIN
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className='flex justify-between items-center gap-4'>
                    {theme === 'dark' ? 
                    <button onClick={() => handleToggleTheme()} className='flex items-center justify-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Toggle Theme</span>
                      <BsSunFill className='h-6 w-6 text-yellow-300' />
                    </button>
                    :
                    <button onClick={() => handleToggleTheme()} className='flex items-center justify-center rounded-full bg-[#fed549] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Toggle Theme</span>
                      <BsMoonFill className='h-6 w-6 text-slate-700' />
                    </button>

                    }

                    <Menu.Button className="flex rounded-full dark:bg-gray-800 bg-[#FFD449] text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={userData?.image?.toString() || krunkerIcon.src}
                        alt="User Image"
                        referrerPolicy='no-referrer'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href={`/player/${userData?.id}`}	
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                            onClick={() => signOut()}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    as="a"
                    className={classNames(
                      `${roboto.className} text-gray-900 hover:text-gray-500`,
                      'block px-3 py-2 rounded-md text-base font-medium cursor-pointer'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                      >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
              {userData?.role === "ADMIN" && (
                <Link href={`/admin/organizations`}>
                <Disclosure.Button
                  as="a"
                  className={classNames(
                    `${roboto.className} text-gray-900 hover:text-gray-500`,
                    'block px-3 py-2 rounded-md text-base font-medium cursor-pointer'
                    )}
                    aria-current={undefined}
                    >
                  {`ADMIN`}
                </Disclosure.Button>
              </Link>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
"use client"
import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useSession, signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import { User } from "next-auth"



export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);
    const { data: session } = useSession()

    // if (!session || !session.user) {
    //     return <div className='bg-slate-600 m-4'>Please login</div>
    // }
    //show username feild link
    // const { username, isSubscribed, queryLeft , _id} = session?.user as User
    // console.log('--from navbar.tsx.. data & status::', session);

    //ts err - desolved by assertion
    const user: User = session?.user as User

    const toggleNav = () => setNavOpen(!navOpen);

    return (
        <header className="bg-gray-900 text-gray-200 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-yellow-400">
                    Ninja-Interviewer
                </Link>

                {/* Menu Links for Desktop */}
                <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="hover:text-yellow-400 transition">
                        Home
                    </Link>
                    <Link href="#features" className="hover:text-yellow-400 transition">
                        Features
                    </Link>
                    <Link href="get-my-questions" className="hover:text-yellow-400 transition">
                        Get-Started
                    </Link>
                    <Link href="dashboard" className="hover:text-yellow-400 transition">
                        Dashboard
                    </Link>
                    <Link href="https://www.linkedin.com/in/sachinandanp5/" target="_blank" className="hover:text-yellow-400 transition">
                        Contact
                    </Link>
                </nav>

                {/* Get Started Button for Desktop */}

                {session ?
                    (
                        <div>
                            <span className="">Welcome,{user?.username || user?.email}</span>
                            <Button onClick={() => signOut()}
                                className="hidden md:inline-block lg:ml-20 bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition"
                            //  className="w-full md:w-auto bg-slate-100 text-black" variant='outline'
                            > Logout</Button>
                        </div>

                    )
                    : (

                        <Link href="/sign-in" className="hidden md:inline-block lg:ml-20 bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition">
                            Sign in
                        </Link>)
                }

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden cursor-pointer" onClick={toggleNav}>
                    {navOpen ? (
                        <XIcon className="h-6 w-6 text-yellow-400" />
                    ) : (
                        <MenuIcon className="h-6 w-6 text-yellow-400" />
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {navOpen && (
                <nav className="md:hidden bg-gray-800 text-center py-4">
                    <Link href="/" className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Home
                    </Link>
                    <Link href="get-my-questions" className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Get-Started
                    </Link>
                    <Link href="dashboard" className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Dashboard
                    </Link>
                    <Link href="https://www.linkedin.com/in/sachinandanp5/" target='_blank' className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Contact
                    </Link>
                    {session ?
                        (
                            <Link href="/sign-up" className="block py-2 text-lg hover:text-yellow-400 transition"
                                onClick={() => { signOut(), toggleNav }}>
                                Logout
                            </Link>

                        ) :
                        (
                            null
                        )}
                </nav>
            )}
        </header>
    );
}

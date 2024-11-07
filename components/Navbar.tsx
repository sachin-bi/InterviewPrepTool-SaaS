"use client"
import Link from 'next/link';
import { useState } from 'react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';



export default function Navbar() {
    const [navOpen, setNavOpen] = useState(false);

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
                        Get Started
                    </Link>
                    <Link href="https://www.linkedin.com/in/sachinandanp5/" target="_blank" className="hover:text-yellow-400 transition">
                        Contact
                    </Link>
                </nav>

                {/* Get Started Button for Desktop */}
                <Link href="/sign-up" className="hidden md:inline-block lg:ml-20 bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400 transition">
                    Sign up
                </Link>

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
                    <Link href="#features" className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Features
                    </Link>
                    <Link href="get-my-questions" className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Get Started
                    </Link>
                    <Link href="https://www.linkedin.com/in/sachinandanp5/" target='_blank' className="block py-2 text-lg hover:text-yellow-400 transition" onClick={toggleNav}>
                        Contact
                    </Link>
                </nav>
            )}
        </header>
    );
}

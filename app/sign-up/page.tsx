import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';

export default function SignUpPage() {
    return (
        <>

            <Head>
                <title>Sign Up | Ninja-Interviewer</title>
            </Head>
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
                        Create Your Account
                    </h2>

                    <form className="space-y-6">
                        {/* Username */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-400">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full px-4 py-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Enter your username"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Create a password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-gray-500 mt-6">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="text-yellow-400 hover:underline" >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

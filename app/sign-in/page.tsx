import Head from 'next/head';
import Link from 'next/link';


export default function SignInPage() {
    return (
        <>
            <Head>
                <title>Sign In | Ninja-Interviewer</title>
            </Head>
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
                        Welcome Back
                    </h2>

                    <form className="space-y-6">
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
                                placeholder="Enter your password"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Forgot Password and Sign Up Link */}
                    <div className="mt-6 text-center">
                        <Link href="/sign-up" className="text-sm text-gray-500 hover:underline">
                            Forgot your password?
                        </Link>
                        <p className="text-sm text-gray-500 mt-4">
                            Don't have an account?{' '}
                            <Link href="/sign-up" className="text-yellow-400 hover:underline" >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

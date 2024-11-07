import Navbar from '@/components/Navbar';
// import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
    <Navbar/>
      {/* <Head>
        <title>Ninja Interviewer | Smart Interview Questions</title>
      </Head> */}
      <main className="flex flex-col items-center min-h-screen bg-gray-900 text-gray-200">
        {/* Hero Section */}
        <section className="w-full bg-gray-800 py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto ">
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 my-7 lg:my-20 ">
              Welcome to Ninja <br /> Interviewer :)
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-300">
            Your Secret Interview Weapon! <br />
              A Tool to get tailored interview questions with ninja-like precision. 
            </p>
            <Link 
            href="get-my-questions"
            className=" inline-block bg-yellow-500 text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-yellow-400 transition duration-300"
            >
              Try Now
              
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-4xl mx-auto py-16 px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-8">
            Why Choose Ninja-Interviewer?
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Swift and Seamless</h3>
              <p className="text-gray-400">
                Enter a job description and get personalized interview questions within seconds.
              </p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Ninja-Level Precision</h3>
              <p className="text-gray-400">
                Our questions are carefully crafted to suit specific roles, providing precise and insightful prep.
              </p>
            </div>
            <div className="bg-gray-800 shadow-lg rounded-lg p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">Sharpen Your Skills</h3>
              <p className="text-gray-400">
                With role-focused questions, enhance your readiness and confidence like a true ninja.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        {/* <section
          id="get-started"
          className="w-full bg-gray-900 py-16 px-4 text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-gray-400 mb-8">
            Enter a job description below and unleash your inner interview ninja!
          </p>
          <form className="max-w-lg mx-auto space-y-4">
            <textarea
              placeholder="Type job description here..."
              className="w-full p-4 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Generate Questions
            </button>
          </form>
        </section> */}

        {/* Footer Section */}
        <footer className="w-full bg-gray-800 text-gray-400 py-8 px-4 text-center">
          <p className="text-sm">&copy; 2024 Ninja-Interviewer. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

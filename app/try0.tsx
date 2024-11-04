import Navbar from '@/components/Navbar';
// import Head from 'next/head';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      {/* //   <Head>
      //     <title>Interview Edge</title>
      //   </Head> */}

      <Navbar />

      <main className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800">



        {/* Hero Section */}
        <section className="w-full bg-blue-600 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Get Job-Specific Interview Questions Instantly
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Enter any job description to get 10 relevant interview questions tailored to your role.
            </p>
            <a
              // href="#get-started"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-4xl mx-auto py-16 px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-600 mb-8">
            Why Use Our Interview Question Generator?
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">Quick and Easy</h3>
              <p className="text-gray-600">
                Simply enter a job description, and within seconds, receive tailored questions to help prepare for your interview.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">Role-Specific Questions</h3>
              <p className="text-gray-600">
                Our generator adapts to various job roles to provide questions that are highly relevant and insightful.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">Improve Interview Preparation</h3>
              <p className="text-gray-600">
                Get a better understanding of potential interview questions, increasing your confidence and readiness.
              </p>
            </div>
          </div>
        </section>
        {/* 
        <section className="bg-gray-100 py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Ace Your Next Interview</h1>
            <p className="text-lg text-center mb-12">
              Get tailored interview questions based on your job description. Practice, prepare, and land your dream job.
            </p>
            <div className="flex justify-center">
              <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Started</a>
            </div>
          </div>
        </section> */}

        {/* Call to Action Section */}
        <section
          id="get-started"
          className="w-full bg-gray-100 py-16 px-4 text-center"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-blue-600 mb-6">
            Ready to Start?
          </h2>
          <p className="text-gray-700 mb-8">
            Enter a job description below and receive 10 custom interview questions instantly!
          </p>
          <form className="max-w-lg mx-auto space-y-4">
            <textarea
              placeholder="Type job description here..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Generate Questions
            </button>
          </form>
        </section>

        {/* Footer Section */}
        <footer className="w-full bg-blue-600 text-white py-8 px-4 text-center">
          <p className="text-sm">&copy; 2024 Interview Question Generator. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

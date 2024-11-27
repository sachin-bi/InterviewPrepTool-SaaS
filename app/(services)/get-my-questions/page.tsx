"use client"
// TODO: in this page implement use form "maintain consistency"


import Navbar from '@/components/Navbar';
import axios from 'axios';
// import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useSession } from "next-auth/react"
import { User } from "next-auth"
import { Loader } from "lucide-react"


export default function GeneratePage() {
    interface InterviewQuestion {
        content: string;
    }

    const [jobDescription, setJobDescription] = useState<string>('');
    // const [isLoading, setIsLoading] = useState(false)
    // const [interviewQuestionsString, setInterviewQuestionsString] = useState<string>('string here')
    const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([
        // {content: "Questions appear here!"}
    ]);

    const [userDetails, setUserDetails] = useState<User>()
    const { data: session , status} = useSession()


    useEffect(() => {
        const getuserDetails = async () => {
            if (!session || !session.user) {
                console.log("Session or user data is not available yet.");
                return;
            }
    
            const { username } = session.user as User; // Safely destructure `username` here
            if (!username) {
                console.log("Username is not available.");
                return;
            }
    
            try {
                const response = await axios.get(`/api/user-details?username=${username}`);
                if (response.status === 200) {
                    setUserDetails(response.data.existingUser);
                }
            } catch (error) {
                console.error("(from useEffect- Error fetching user details:", error);
            }
        };
    
        getuserDetails();
        console.log("Fetching user details if session is available...from useEffect");
    }, [session]);
    

    // useEffect(() => {
    //     const getuserDetails = async () => {
    //         const response = await axios.get(`/api/user-details?username=${username}`)
    //         // console.log('---from current work', response);

    //         if (response.status === 200) {
    //             setUserDetails(response.data.existingUser)
    //         }
    //         return

    //     }

    //     getuserDetails()
    //     console.log("Run something - Getting current user details from useEffect")

    // }, [session,status])
    


    if (!session || !session.user) {
        // return <div className='bg-slate-300 m-4'>Please login, or let ur session load</div>
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
                {/* Ninja Icon */}
                <div className="animate-pulse text-6xl mb-4">🥷</div> {/* Alternatively, replace with a ninja SVG icon */}

                {/* Project Name */}
                <h1 className="text-3xl font-extrabold text-yellow-400 tracking-wide mb-2">Ninja Interviewer</h1>

                {/* Tagline */}
                <p className="text-gray-400 text-center mb-8">
                    Crafting your interview questions with precision...
                </p>

                {/* Loading Spinner */}
                <div className="flex items-center space-x-2">
                    <Loader className="animate-spin text-yellow-400 h-6 w-6" />
                    <span className="text-gray-400">Loading, please wait...</span>
                </div>
            </div>
        );
    }

    //show username feild link
    const { username, isSubscribed, queryLeft, _id } = session?.user as User
    //TODO: remove id if not used!


    //---------------------------------------------------work in  progress-------------------------------------------------------------
    // const updateDB = async ()=>{

    //     const res = await axios.post("/api/user-details", { username, prompt: jobDescription , response:interviewQuestions })

    // }




    const handleGenerateQuestions = async () => {

        const response = await axios.post("/api/suggest-questions", { content: jobDescription , username })
        setInterviewQuestions(response.data.messages || {
            content: "We will be back soon.!:"
        });

    //     // const generatedQuestions = response.data.messages;
    //     const generatedQuestions = [
    //         { content: "this is question no 1.!:" }
    //         , { content: "this is question no 2.!:" }
    //         , { content: "this is question no 3.!:" }

    //     ]
    //     setInterviewQuestions(generatedQuestions)
    //     const questionsString = generatedQuestions.content!.join('||');
    //     console.log(questionsString);
        
    //    await setInterviewQuestionsString(questionsString || "data not present"); //use state
        
        
    //     console.log("this is string::" + interviewQuestionsString);
        
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">

                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 text-center">
                        {username} - Get Your Personalized Interview Questions
                    </h2>
                    <p className='m-4'>
                        Total Free Query Left - {userDetails?.queryLeft} <br />
                        Subscribed to Premium - {userDetails?.isSubscribed ? "Yes" : "No"} <br />
                        Your email - {userDetails?.email}
                    </p>

                    {/* md:grid-cols-2 */}
                    <div className="grid 
                     gap-8">
                        {/* Input Section */}
                        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                                Enter Job Description:
                            </h2>
                            <p className="text-gray-400 mb-4">
                                {/* Enter the Job Description or JD to get relevant interview questions. <br /> */}
                                <i className=' font-sans '> Hint: Copy and Paste job description text from the email or pdf , that you got from collage or company</i>
                                {/* Enter the job details to generate relevant interview questions. */}
                            </p>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Type job description here..."
                                className="w-full p-4 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                rows={5}
                            />
                            {userDetails?.queryLeft! > 0 ?
                                <button
                                    // disabled={true}

                                    onClick={() => { handleGenerateQuestions(); }}
                                    className="w-full mt-4 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold  transition duration-300"
                                >
                                    Get Questions
                                </button>

                                :
                                <button
                                    disabled={true}
                                    className="w-full mt-4 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
                                >
                                    Limit Exusted! Try Premium.
                                </button>
                            }
                        </section>

                        {/* Output Section */}
                        <section className="bg-gray-800 p-6 rounded-lg shadow-lg font-sans">
                            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                                Your Interview Questions:
                            </h2>
                            <p className="text-gray-400 mb-4 italic font-medium">
                                Here are the interview questions based on the job description you provided.
                            </p>
                            {interviewQuestions.length > 0 ? (
                                <ul className="space-y-4 list-disc list-inside">
                                    {interviewQuestions.map((question, index) => (
                                        <li key={index} className="text-gray-300">
                                            {question.content}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">No questions generated yet. Please enter a job description in details.</p>
                            )}
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}

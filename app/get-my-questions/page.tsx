"use client"

import Navbar from '@/components/Navbar';
import axios from 'axios';
// import Head from 'next/head';
import { useState } from 'react';

export default function GeneratePage() {
    const [jobDescription, setJobDescription] = useState<string>('');
    interface InterviewQuestion {
        content: string;
    }

    const [interviewQuestions, setInterviewQuestions] = useState<InterviewQuestion[]>([
        
    ]);


    const handleGenerateQuestions = async () => {


        const response = await axios.post("/api/suggest-questions", { content: jobDescription })
        setInterviewQuestions(response.data.messages || {
            content: "We will be back soon.!:"
        });


        // console.log("--api response::", response.data.messages);
        // console.log("--jd::",jobDescription);


        // Dummy generation logic (replace this with actual API call)
        // if (jobDescription.trim()) {
        //     setInterviewQuestions([
        //         "Tell us about your experience with similar roles.",
        //         "How would you handle the key responsibilities in this job?",
        //         "What makes you a good fit for this role?",
        //         "How do you approach problem-solving in challenging scenarios?",
        //         "What skills do you bring to this position?",
        //         "Describe a situation where you demonstrated leadership.",
        //         "How do you stay updated with industry trends?",
        //         "How would you tackle a difficult project under tight deadlines?",
        //         "What motivates you to perform well in this job?",
        //         "Can you give an example of a successful project you completed?"
        //     ]);
        // } else {
        //     setInterviewQuestions([]);
        // }
    };

    return (
        <>
            {/* <Head>
                <title>Get Interview Questions | Ninja-Interviewer</title>
            </Head> */}
            <Navbar />
            <main className="min-h-screen bg-gray-900 text-gray-200 py-8 px-4">

                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 text-center">
                        Get Your Personalized Interview Questions
                    </h1>

                    {/* md:grid-cols-2 */}
                    <div className="grid 
                     gap-8">
                        {/* Input Section */}
                        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                                Job Description
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
                            <button
                                onClick={handleGenerateQuestions}
                                className="w-full mt-4 bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
                            >
                                Get Questions
                            </button>
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

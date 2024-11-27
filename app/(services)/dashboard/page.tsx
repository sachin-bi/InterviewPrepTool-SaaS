"use client"

import React, { useState, useEffect } from "react";
import Navbar from '@/components/Navbar';

import { useSession } from "next-auth/react"
import { User } from "next-auth"
import axios from "axios";



const UserDashboard: React.FC = () => {
    
    
    
    const [darkMode, setDarkMode] = useState(false);

    const [userDetails, setUserDetails] = useState<User>()
    const { data: session,status } = useSession()

    // interface User {
    //     _id?: string;
    //     username?: string;
    //     email?: string; //TODO: look if error
    //     isSubscribed?: boolean;
    //     queryLeft?: number;
    //   }
    // Example user data
    const user = {
        username: "JohnDoe",
        email: "john.doe@example.com",
        queryLeft: 15,
        isPremium: true,
    };

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") setDarkMode(true);

        // const getuserDetails = async () => {
        //     const response = await axios.get(`/api/user-details?username=${username}`)
        //     // console.log('---from current work', response);

        //     if (response.status === 200) {
        //         setUserDetails(response.data.existingUser)
        //     }
        //     return

        // }

        // getuserDetails()

        if (status === "authenticated" && session?.user?.username) {
            const getUserDetails = async () => {
              try {
                const response = await axios.get(
                  `/api/user-details?username=${session.user.username}`
                );
                if (response.status === 200) {
                  setUserDetails(response.data.existingUser);
                }
              } catch (error) {
                console.error("Error fetching user details:", error);
              }
            };
      
            getUserDetails();
          }


        console.log("Run something - Getting current user details from useEffect")

    }, [session,status]);

    const { username, isSubscribed, queryLeft, _id } = session?.user as User

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("theme", darkMode ? "light" : "dark");
    };

    return (
        <>
        <Navbar/>
            <div className={`${darkMode ? "dark" : ""}`}>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
                    {/* Header */}
                    <header className="flex justify-between items-center p-5 bg-white dark:bg-gray-800 shadow-md">
                        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            User Dashboard
                        </h1>
                        <button
                            className="py-2 px-4 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-md"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </header>

                    {/* Content */}
                    <main className="flex justify-center items-center py-10">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                Welcome, {username}
                            </h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Username:</span>
                                    <span>{username}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Email:</span>
                                    <span>{userDetails?.email}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Total Queries Left:</span>
                                    <span>{userDetails?.queryLeft}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Subscribed to Premium:</span>
                                    <span>{userDetails?.isSubscribed ? "Yes" : "No"}</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;

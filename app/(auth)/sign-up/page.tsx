'use client'
import Navbar from '@/components/Navbar';
// import Head from 'next/head';
// import Link from 'next/link';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from 'axios';
import { ApiResponse } from "@/types/ApiResponse"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

export default function SignUpPage() {


    const [username, setUsername] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const debounced = useDebounceCallback(setUsername, 500)
    const { toast } = useToast()
    const router = useRouter()


    //zod implimentation
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })





    useEffect(() => {

        const checkUsernameUnique = async () => {
            if (username) {
                setIsCheckingUsername(true)
                setUsernameMessage('')      //TODO: set checking -> if username already taken?
                try {   //TODO: set this route..
                    const response = await axios.get(`/api/check-username-unique?username=${username}`)
                    // let message = response.data.message
                    // setUsernameMessage(message)
                    setUsernameMessage(response.data.message)
                    // console.log('--FE sign-up page, response:',response);


                } catch (error) {
                    // axios err handling 
                    // checking err type before assigning it

                    const axiosError = error as AxiosError<ApiResponse>;
                    setUsernameMessage(axiosError.response?.data.message ?? "-Error checking username")
                } finally {
                    setIsCheckingUsername(false)
                }

            }
        };

        checkUsernameUnique();

    }, [username])





    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {    //by default you get data here
        console.log("-- from sign in page , onsubmit data:", data);     // TODO: comment it down.!

        setIsSubmitting(true)
        try {
            const response = await axios.post<ApiResponse>('/api/sign-up', data)
            toast({
                title: 'Success',
                description: response.data.message
            })

            router.replace(`/get-my-questions`)   //TODO: need to create verify page   
            setIsSubmitting(false)

        } catch (error) {
            console.error("-- err in signup of user @signin page, err:", error)
            const axiosError = error as AxiosError<ApiResponse>;
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Signup failed!",
                description: errorMessage,
                variant: "destructive"
            })
            setIsSubmitting(false)

        }

    }







    return (
        <>
{/* 
            <Head>
                <title>Sign Up | Ninja-Interviewer</title>
            </Head> */}
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
                        Create Your Account
                    </h2>
                    {/* 
                    <form className="space-y-6">
                        
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

                        
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form> 
*/}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="username"
                                                {...field}
                                                onChange={(e) => {

                                                    field.onChange(e);
                                                    debounced(e.target.value) // extra - as username is being maintained in usestate

                                                }}
                                            />
                                        </FormControl>
                                        {
                                            isCheckingUsername && <Loader2 className="animate-spin" />
                                        }
                                        <p className={`text-sm ${usernameMessage === "Username is unique" ? "text-green-500" : 'text-red-500'}`}>
                                            {usernameMessage}
                                        </p>
                                        {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="email"
                                                {...field}

                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="password"
                                                {...field}

                                            />
                                        </FormControl>



                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isSubmitting}>
                                {
                                    isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        </>
                                    ) : ('Signup')
                                }
                            </Button>
                        </form>
                    </Form>



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

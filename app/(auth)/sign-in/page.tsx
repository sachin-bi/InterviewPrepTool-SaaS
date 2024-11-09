'use client'
// import Head from 'next/head'; //don't use head here
// import Link from 'next/link';
// will not run without wrapper ... so made wrapper in context folder and wrraped layout with that


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
// import { ApiResponse } from "@/types/ApiResponse"

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
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"

export default function page() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  //zod implimentation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',   // look out- its email
      password: '',
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const result = await signIn('credentials', {    // no axios required - signIn() from 
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    console.log("-- result value from @signIn/page", result)
    toast({
      title: 'Login Failed!',
      description: "Incorrect Username/email/error.!",
      // variant: "destructive"
    })
    //TODO: imp!! fix this toast its not working // look toast provider too
    if (result?.error) {
      console.log(
        "Login Failed! - Incorrect Username/email/error.!"
      );

      toast({
        title: 'Login Failed!',
        description: "Incorrect Username/email/error.!",
        // variant: "destructive"
      })
    }

    if (result?.url) {
      // router.push('/get-my-questions')
      router.replace('/get-my-questions')
    }
    setIsSubmitting(false)
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className="mb-4">Sign in to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email or username"
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
                ) : ('Signin')
              }
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Register here!{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

// export default page



// --old code--
// 'use client'
// import { useSession, signIn, signOut } from "next-auth/react"

// export default function Component() {

//   const { data: session } = useSession()

//   if (session) {

//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     )
//   }

//   return (
//     <>
//       Not signed in <br />
//       <button className="bg-orange-500 px-3 py-1 m-4 rounded" onClick={() => signIn()}>Sign in</button>
//     </>
//   )
// }





// export default function SignInPage() {
//     return (
//         <>
//             <Head>
//                 <title>Sign In | Ninja-Interviewer</title>
//             </Head>
//             <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-200 px-4">
//                 <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
//                     <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
//                         Welcome Back
//                     </h2>

//                     <form className="space-y-6">
//                         {/* Email */}
//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-400">
//                                 Email
//                             </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 required
//                                 className="w-full px-4 py-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                                 placeholder="Enter your email"
//                             />
//                         </div>

//                         {/* Password */}
//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-400">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 required
//                                 className="w-full px-4 py-3 mt-1 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                                 placeholder="Enter your password"
//                             />
//                         </div>

//                         {/* Submit Button */}
//                         <button
//                             type="submit"
//                             className="w-full py-3 mt-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition duration-300"
//                         >
//                             Sign In
//                         </button>
//                     </form>

//                     {/* Forgot Password and Sign Up Link */}
//                     <div className="mt-6 text-center">
//                         <Link href="/sign-up" className="text-sm text-gray-500 hover:underline">
//                             Forgot your password?
//                         </Link>
//                         <p className="text-sm text-gray-500 mt-4">
//                             Don't have an account?{' '}
//                             <Link href="/sign-up" className="text-yellow-400 hover:underline" >
//                                 Sign up
//                             </Link>
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

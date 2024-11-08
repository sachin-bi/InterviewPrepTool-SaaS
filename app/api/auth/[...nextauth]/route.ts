// import { handlers } from "@/auth" // Referring to the auth.ts we just created
// export const { GET, POST } = handlers

import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}





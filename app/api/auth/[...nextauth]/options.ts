import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"; //if fb, github, google,etc;
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // Add logic here to look up the user from the credentials supplied....accha

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              //TODO: LOOK in login u can provide both username or email
              { email: credentials.identifier.email },
              { username: credentials.identifier.username },
            ],
          });

          if (!user) {
            throw new Error("No user found with this email!");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          ); // little in consistency here

          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password!");
          }
        } catch (err: any) {
          throw new Error(err); // err throw needed as it is provided in documentation
        }
      },
    }),
  ],

  //TODO: look out and understand...
  callbacks: {
    // if token is short - then bar bar db call karna padege
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.queryLeft = user.queryLeft;
        token.isSubscribed = user.isSubscribed;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.queryLeft = token.queryLeft;
        session.user.isSubscribed = token.isSubscribed;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

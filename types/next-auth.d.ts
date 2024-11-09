import "next-auth";
import { DefaultSession } from "next-auth";
import { decl } from "postcss";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    email?: string; //TODO: look if error
    isSubscribed?: boolean;
    queryLeft?: number;
  }

  interface Session {   //its Session not session
    user: {
      _id?: string;
      username?: string;
      isSubscribed?: boolean;
      queryLeft?: number;
    } 
    & DefaultSession["user"]; // user obj come or not but default session will contain a key 'user'
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isSubscribed?: boolean;
    queryLeft?: number;
  }
}

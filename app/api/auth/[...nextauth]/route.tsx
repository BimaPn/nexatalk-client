import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";

export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
              axios.defaults.withCredentials = true;
              const res = axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/login`,
              {email : credentials?.email,password : credentials?.password},
              {withCredentials:true, headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000', 
              'Content-Type': 'application/json'
              }},)
              const error = await res.catch((error) => error.response.data.message);
              if(typeof error === "string"){
                throw new Error(error);
              }
              const user = await res.then(res => {
                console.log(res)
                return res.data; 
              })
              return user;
            },
        }),  
    ],
    session:{
        maxAge : 60 * 60 * 24 * 7
    },
    callbacks: {
        async jwt({token,user,trigger,session}) {
            if(trigger === 'update') {
                return {...token,...session.user}
            }
            return { ...token,...user }
        },
        async session({session,token,user}) {
            session.user = token as any
            return session
        }
    },
    // events
    pages: {
        signIn: '/login',
        newUser: '/egister'
      },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}

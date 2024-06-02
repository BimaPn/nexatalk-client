import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        user : {
            id: string,
            name : string,
            username : string,
            email : string,
            avatar : string,
            bio : string,
            accessToken : string
        }
    }
}

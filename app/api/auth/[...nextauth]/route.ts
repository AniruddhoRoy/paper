import bcrypt from "bcryptjs"
import NextAuth ,{AuthOptions} from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

import { PrismaAdapter } from "@next-auth/prisma-adapter"

import client from "@/app/libs/prismadb"

export const authOptions:AuthOptions={
adapter:PrismaAdapter(client),
providers:[
    GithubProvider({
        clientId: process.env.Github_ID as string,
        clientSecret:process.env.Github_client_Secret as string
    }),
    GoogleProvider({
        clientId: process.env.Google_ID as string,
        clientSecret:process.env.Google_client_Secret as string
    }),
    CredentialsProvider({
        name:"credentials",
        credentials:{
            email:{label:"email",type:"email"},
            password:{label:"password",type:"password"}
        },
        async authorize(credentials){
            if(!credentials?.email || !credentials.password){
                throw new Error('Invalid Credentials')
            }
            const user = await client.user.findUnique({
                where:{
                    email:credentials.email
                }
            })
            if(!user || !user.hashedPassword){
                throw new Error('Invalid Credentials')
            }
            const isCorrectPassword = await bcrypt.compare(credentials.password,user.hashedPassword)

            if(!isCorrectPassword){
                throw new Error('Invalid Credentials')
            }
            return user
        }
    })
],
debug:process.env.NODE_ENV ==="development",
session:{
    strategy:"jwt",

},
secret:process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export {handler as GET , handler as POST}
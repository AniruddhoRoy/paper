import bcrypt from "bcryptjs"
import client from "@/app/libs/prismadb"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request:NextRequest) {
    try{
        const body = await request.json();

    const {
        email,
        password,
        name
    } = body

    if(!email || !password || !name){
        return new NextResponse("Missing info",{status:400})
    }

    const hashedPassword = await bcrypt.hash(password,12);
    const user = await client.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })
    return NextResponse.json(user)
    }catch(error){
        console.log(error,'Registration Error')
        return new NextResponse('Internal Error',{status:500})
    }
}
import { getCurrentUser } from "@/app/actions/getCurrentUser"
import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server"

export async function POST(request:Request){
    try{
        const currentUser = await getCurrentUser()
        const body = await request.json();
        const {name,image} = body;
        if(!currentUser?.id){
            return new NextResponse("Unauthorized",{status:401})
        }
        const updateUser = await client.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                name,
                image
            }
        }) 
        return NextResponse.json(updateUser)
    }catch(e){
        console.log(e)
        return new NextResponse('Internal Error',{status:500})
    }
}
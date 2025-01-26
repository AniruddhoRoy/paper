import { NextResponse } from "next/server";

import client from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request:Request){
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {
            userId,
            isGroup,
            members,
            name
        }=body;
        if(!currentUser?.id && !currentUser?.email ){
            return new NextResponse('unauthorized',{status:401})
        }
        if(isGroup && (!members || members.length<2 || !name)){
            return new NextResponse('Invalid Data',{status:400});
        }
        if(isGroup){
           const newConversation = await client.conversation.create({
            data:{
                name,
                isGroup,
                users:{

                }
            }
           }) 
        }

    }catch{
        return new NextResponse("Internal Error",{status:500})
    }
}
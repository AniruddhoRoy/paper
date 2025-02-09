import { getCurrentUser } from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server"


type Iparams={
    conversationId?:string
}

export async function DELETE(
    request:Request,
    {params}:{params:Iparams}
){

    try{
        const {conversationId}= await params;
        const currentUser = await getCurrentUser()
        if(!currentUser?.id){
            return new NextResponse('Unauthorized',{status:401})
        }
       const existingConversation =await client.conversation.findUnique({
        where:{
            id :conversationId
        },
        include:{
            users:true
        }
       })
       if(!existingConversation){
        return new NextResponse('Invalid Id',{status:400})
       }
       const deleteConversation = await client.conversation.deleteMany({
        where:{
            id:conversationId,
            userIds:{
                hasSome:[currentUser.id]
            }
        }
       })
       existingConversation.users.forEach((user)=>{
            if(user.email){
                pusherServer.trigger(user.email,'conversation:remove',existingConversation)
            }
       })

       return NextResponse.json(deleteConversation)

    }catch(e){
        console.log(e)
        return new NextResponse('Internal Error',{status:500})
    }
}
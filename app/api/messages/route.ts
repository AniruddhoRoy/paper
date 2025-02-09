import { getCurrentUser } from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request:Request){
    try{
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {message,image,conversationId} = body;
        // console.log(body);
        if(!currentUser?.id || !currentUser.email){
            return new NextResponse('Unauthorized',{status:401});
        }
        const newMessage = await client.message.create({
            data:{
                body:message,
                image:image,
                conversation:{
                    connect:{
                        id:conversationId
                    }
                },
                sender:{
                    connect:{
                        id:currentUser.id
                    }
                },
                seen:{
                    connect:{
                        id:currentUser.id
                    }
                }
            },
            include:{
                seen:true,
                sender:true
            }
        })

        const updatedConversation = await client.conversation.update({
            where:{
                id:conversationId
            },data:{
                lastMessageAt:new Date(),
                messages:{
                    connect:{
                        id:newMessage.id
                    }
                }
            },
            include:{
                messages:{
                    include:{
                        seen:true
                    }
                },
                users:true
            }
        })
        await pusherServer.trigger(conversationId,'messages:new',newMessage)
        const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1]
        updatedConversation.users.map((user)=>{
            pusherServer.trigger(user.email!,'conversation:update',{
                id:conversationId,
                messages:[lastMessage]
            })
        })
        return NextResponse.json(newMessage)
    }catch(e){
        console.log(e)
        return new NextResponse('Internal Error',{status:500});
    }
}
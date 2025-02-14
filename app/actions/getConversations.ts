import client from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function getConversations(){
    const currentUser =await getCurrentUser();
    if(!currentUser?.id){
        return []
    }
    try{
        const conversations = await client.conversation.findMany({
            orderBy:{
                lastMessageAt:'desc'
            },
            where:{
                userIds:{
                    has:currentUser.id
                }
            },
            include:{
                users:true,
                messages:{
                    include:{
                        sender:true,
                        seen:true
                    }
                }
            }
        })
        return conversations
    }catch{
        return [];
    }
}

import client from "../libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export async function GetConversationById(conversationId:string){
    try{
        const currentUser = await getCurrentUser();
        if(!currentUser){
            return null;
        }
        const conversation = await client.conversation.findFirst({
            where:{
                id:conversationId
            },
            include:{
                users:true
            }
        })
        return conversation
    }catch{
        return null;
    }
}
import client from "../libs/prismadb";


export async function GetMessages(conversationId:string){
    try{
        const messages = await client.message.findMany({
            where:{
                conversationId:conversationId
            },
            include:{
                sender:true,
                seen:true
            },
            orderBy:{
                createdAt:'asc'
            }
        })
        return messages
    }catch{
        return null;
    }
}
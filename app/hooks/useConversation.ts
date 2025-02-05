"use client"
import { useParams } from "next/navigation";
import { useMemo } from "react";


 const useConversationId = ()=>{
    const params = useParams()
    const conversationId:string = useMemo(()=>{
        if(!params?.conversationid){
            return ''
        }
        const conversationId = params.conversationid
        return conversationId as string
    },[params.conversationId])

    // console.log(conversationId+"Hello");
    const isOpen = useMemo(()=>!!conversationId,[conversationId])

    return useMemo(()=>({
        isOpen,
        conversationId
    }),[isOpen,conversationId])
}
export default useConversationId
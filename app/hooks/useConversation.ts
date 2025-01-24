import { useParams } from "next/navigation";
import { useMemo } from "react";


 const useConversationId = ()=>{
    const params = useParams()
    const conversationId:string = useMemo(()=>{
        if(!params?.conversationId){
            return ''
        }
        return conversationId as string
    },[params.conversationId])

    const isOpen = useMemo(()=>!!conversationId,[conversationId])

    return useMemo(()=>({
        isOpen,
        conversationId
    }),[isOpen,conversationId])
}
export default useConversationId
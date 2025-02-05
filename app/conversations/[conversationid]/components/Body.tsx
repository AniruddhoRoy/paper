"use client"

import useConversationId from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import { useEffect, useRef, useState } from "react"
import  MessageBox  from "./messageBox"
import axios from "axios"
type initialMessagesProps={
    initialMessages:FullMessageType[]|null
}


export const Body:React.FC<initialMessagesProps>=({initialMessages})=>{
    const [messages,setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)
    const {conversationId} = useConversationId();

    useEffect(()=>{
        axios.post(`/api/conversations/${conversationId}/seen`)
    },[conversationId])

    return <div className="flex-1 overflow-y-auto">
        {messages?.map((message,i)=>(<MessageBox
        isLast = {i===messages.length-1}
        key = {message.id}
        data ={message}
        />))}
       < div ref={bottomRef} className="pt-24" />
    </div>
}
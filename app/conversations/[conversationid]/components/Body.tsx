"use client"

import useConversationId from "@/app/hooks/useConversation"
import { FullMessageType } from "@/app/types"
import { useEffect, useRef, useState } from "react"
import  MessageBox  from "./messageBox"
import axios from "axios"
import { pusherClient } from "@/app/libs/pusher"
import { find } from "lodash"
type initialMessagesProps={
    // initialMessages:FullMessageType[]|null
    initialMessages:FullMessageType[]|[]
}


export const Body:React.FC<initialMessagesProps>=({initialMessages})=>{
    const [messages,setMessages] = useState(initialMessages)
    const bottomRef = useRef<HTMLDivElement>(null)
    const {conversationId} = useConversationId();
    //todo:have to fix this
    useEffect(()=>{
        axios.post(`/api/conversations/${conversationId}/seen`)
    },[conversationId])

    useEffect(()=>{
        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView();

        const messageHandler = (message:FullMessageType)=>{
            axios.post(`/api/conversations/${conversationId}/seen`)
            setMessages((current)=>{
                if(find(current,{id:message.id})){
                    return current
                }

                return [...current,message]
            })
            bottomRef.current?.scrollIntoView();
        }
        const updateMessageHandaler = (newMessage : FullMessageType)=>{
            setMessages((cur)=>cur.map((curMess)=>{
                if(curMess.id===newMessage.id){
                    return newMessage
                }
                return curMess
            }))
        }

        pusherClient.bind('messages:new',messageHandler)
        pusherClient.bind('message:update',updateMessageHandaler)
        return ()=>{
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new',messageHandler)
            pusherClient.unbind('message:update',updateMessageHandaler)
        }
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

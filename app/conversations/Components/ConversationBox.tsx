"use client"
import { FullConversationType } from "@/app/types"

type ConversationBoxProps={
    data:FullConversationType,
    selected:boolean
}

export default function ConversationBox({data,selected}:ConversationBoxProps){
    return <div>
          CONVERSION
    </div>
}
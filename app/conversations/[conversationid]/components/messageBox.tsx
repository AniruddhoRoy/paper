"use client"
import { FullMessageType } from "@/app/types"
import { useSession } from "next-auth/react"

interface messageBoxProps{
    isLast :boolean
        data ?:FullMessageType
}

 const MessageBox:React.FC<messageBoxProps> = ({isLast,data})=>{
    const session = useSession()

    const isOwn = session.data?.user?.email===data?.sender.email
    return <div>
        Message box
    </div>
}

export default MessageBox
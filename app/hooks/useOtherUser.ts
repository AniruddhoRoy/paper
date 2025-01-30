import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";


export function useOtherUser(conversation:FullConversationType|{
    users:User[]
}){
    const session = useSession();
    const OtherUser = useMemo(()=>{
        const CurrentUserEmail = session.data?.user?.email

        const OtherUser = conversation.users.filter((user)=> user.email!==CurrentUserEmail)
        return OtherUser[0]
    },[session.data?.user?.email,conversation.users])
    return OtherUser
}
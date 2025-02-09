"use client"
import useConversationId from "@/app/hooks/useConversation";
//custom types
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import { GroupChatModal } from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

export default function ConversationList({initialItems,users}:{initialItems:FullConversationType[],users:User[]}){
    const session = useSession()
    const [items,setItems] = useState(initialItems);
    const [isModalOpen,setModalOpen] = useState(false)
    const router = useRouter();
    const {conversationId , isOpen} = useConversationId()

    const pusherKey = useMemo(()=>{
        return session.data?.user?.email
    },[session.data?.user?.email])

    useEffect(()=>{
        if(!pusherKey)
        {
            return;
        }
        const newHandler = (conversation:FullConversationType)=>{
            setItems((cur)=>{
                if(find(cur,{id:conversation.id})){
                    return cur
                }
                return [conversation,...cur]
            })
        }
        const updateHandler = (conversation:FullConversationType)=>{
            setItems((cur)=>cur.map((currentConversation)=>{
                    if(currentConversation.id===conversation.id){
                        return{
                            ...currentConversation,
                            messages:conversation.messages
                        }
                    }
                    return currentConversation
            }))
        }

        const removeHandler = (conversation:FullConversationType)=>{
            setItems((cur)=>{
                return [...cur.filter((convo)=>convo.id!==conversation.id)]
            })
            if(conversationId===conversation.id){
                router.push('/conversations')
            }
        }

        pusherClient.subscribe(pusherKey)
        pusherClient.bind('conversation:new',newHandler);
        pusherClient.bind('conversation:update',updateHandler);
        pusherClient.bind('conversation:remove',removeHandler);

        return ()=>{
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new',newHandler)
            pusherClient.unbind('conversation:update',updateHandler)
            pusherClient.unbind('conversation:remove',removeHandler);
        }
    },[pusherKey,conversationId,router])
    return (
        <>
        <GroupChatModal
        isOpen= {isModalOpen}
        onClose = {()=> setModalOpen(false)}
        users={users}
        />
        <aside className={clsx(`
            fixed
            inset-y-0
            pb-20
            lg:pb-0
            lg:left-20
            lg:w-80
            lg:block
            overflow-y-auto
            border-r
            border-gray-200
        `,
        isOpen? "hidden":"block w-full left-0"
        )}>
            <div className="px-5">
                <div className="flex justify-between mb-4 pt-4">
                    <div className="text-2xl font-bold text-neutral-800 capitalize">
                        messages
                    </div>
                    <div className="
                    rounded-full p-2 bg-gray-100
                    text-gray-600 cursor-pointer hover:opacity-75
                    transition
                    "
                    onClick={()=>{setModalOpen(true)}}
                    >
                        <MdOutlineGroupAdd size={20}/>
                    </div>
                </div>
                {items.map(item=>(
                    <ConversationBox key={item.id} data={item} selected={conversationId===item.id}/>
                ))}
            </div>

        </aside>
        </>
    )
}
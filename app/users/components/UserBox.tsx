"use client"
import { Avatar } from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export function UserBox({data}:{data:User}){
    const router = useRouter();
    const [loading,setLoading] = useState(false)
    const handleSubmit = useCallback(()=>{
        setLoading(true);
        axios.post('api/conversations',{
            userId:data.id
        }).then((data)=>{
            router.push(`/conversations/${data.data.id}`);
        }).finally(()=>{
            setLoading(false)
        })
    },[data,router])
    return(<> 
    {
        loading && <LoadingModal />
    }
    
    <div onClick={handleSubmit} className="
    w-full
    relative
    flex
    items-center
    space-x-3
    bg-white
    p-3
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    ">
        <Avatar user={data}/>
        <div className="min-w-0 flex-1">
            <div className="focus:outline-none">
                <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-gray-900">
                        {data.name}
                    </p>
                </div>
            </div>

        </div>
    </div>
    </>)
}
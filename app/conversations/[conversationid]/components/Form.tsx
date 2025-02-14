"use client"

import useConversationId from "@/app/hooks/useConversation"
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { MessageInput } from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

export function Form(){
    const {conversationId} = useConversationId();
    const {
        register,
        handleSubmit,
        formState:{
            errors
        },
        setValue
    } = useForm<FieldValues>({
        defaultValues:{
            message:''
        }
    })
    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setValue('message','',{shouldValidate:true})
        axios.post('/api/messages',{
            ...data,conversationId
        })
    }
    const handleUpload = (result:any)=>{

        axios.post(`/api/messages`,{
            image:result?.info?.secure_url,
            conversationId
        })
    }

    return <div className="
        py-4
        px-4
        bg-white
        border-t
        flex
        items-center
        gap-2
        lg:gap-4
        w-full
    ">
        <CldUploadButton 
        options={{maxFiles:1}}
        onSuccess={(result)=>{handleUpload(result)}}
        uploadPreset="test-1"
        >
       <HiPhoto size={30} className="text-emerald-400"/>
        </CldUploadButton>
       <form onSubmit={handleSubmit(onSubmit)}
       className="flex items-center gap-2 lg:gap-4 w-full"
       >
        <MessageInput 
        id='message'
        register = {register}
        errors = {errors}
        required
        placeholder="Write a message"
        />
        <button type="submit" className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition">
            <HiPaperAirplane size={20} className="text-white"/>
        </button>
       </form>
    </div>
}
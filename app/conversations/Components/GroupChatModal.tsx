"use Client"

import { Button } from "@/app/components/Button"
import { Input } from "@/app/components/Input/Input"
import { Select } from "@/app/components/Input/Select"
import Modal from "@/app/components/Model"
import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

type GroupChatModalProps = {
    isOpen?:boolean
    onClose:()=>void
    users:User[]
}

export const GroupChatModal:React.FC<GroupChatModalProps> = ({isOpen,onClose,users})=>{
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            members:[]
        }
    })

    const members = watch('members')

    const onSubmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true)
        axios.post('/api/conversations',{
            ...data,
            isGroup:true
        }).then(()=>{
            router.refresh()
            onClose();
        }).catch(()=>{
            toast.error("Something Went Wrong")
        }).finally(()=>{
            setIsLoading(false)
        })
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="
                    text-base
                    font-semibold
                    leading-7
                    text-gray-900
                    ">
                        Create a Group Chat
                    </h2>
                    <p className="
                    mt-1
                    text-sm
                    leading-6
                    text-gray-600
                    ">
                        Chat with more than two people
                    </p>
                    <div className="
                    mt-10
                    flex
                    flex-col
                    gap-y-8
                    ">
                        <Input 
                        register={register} 
                        errors={errors} 
                        id="name"
                        label="Enter Group Name"
                        required
                        disable={isLoading}
                        />
                        <Select 
                        disabled={isLoading}
                        label="Members"
                        options={users.map((user)=>({
                            value:user.id,
                            label:user.name
                        }))}
                        onChange={(value)=>setValue('members',value,{
                            shouldValidate:true
                        })}
                        value={members}
                        />
                    </div>
                </div>
               </div>
               <div className="
               mt-6
               flex
               items-center
               justify-end
               gap-x-6
               ">
                <Button 
                disabled={isLoading}
                onclick={onClose}
                type="button"
                secondary
                >Cancel</Button>
                <Button 
                disabled={isLoading}
                type="submit"
                secondary
                >Create</Button>
               </div>
            </form>
        </Modal>

    )

}
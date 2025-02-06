"use Client"

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Modal from "../Model"
import { Input } from "../Input/Input"

type SettingsModalProps={
    currentUser:User
    isOpen:boolean
    onClose:()=>void
}

export const SettingsModal:React.FC<SettingsModalProps>=({currentUser,isOpen,onClose})=>{
    const router = useRouter();
    const [isLoading,setIsLoading] = useState(false);
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
            name:currentUser.name,
            image:currentUser.image
        }
    })

    const image = watch('image')
    const handleUpload = (result:any)=>{
        setValue('image',result?.info?.secure_url,{
            shouldValidate:true
        })
    }

    const onSunmit:SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true)
        axios.post('/api/settings',data).then(()=>{
            router.refresh();
            onClose();
        }).catch(()=>toast.error('Something went wrong')).finally(()=>{
            setIsLoading(false)
        })
    }
    return <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit(onSunmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                <h2 className="
                text-base
                font-semibold
                leading-7
                text-gray-900
                ">
                    Profile
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Edit Your Information
                </p>
                    <div
                    className="
                    mt-10
                    flex
                    flex-col
                    gap-y-8
                    ">
                        <Input disable={isLoading} label="Name" register={register} id="name" required errors={errors}></Input>
                    </div>
                    <label>
                        Photo
                    </label>
                </div>

            </div>
        
        </form>
    </Modal>
}
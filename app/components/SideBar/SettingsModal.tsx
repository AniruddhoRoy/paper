"use Client"

import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Modal from "../Model"
import { Input } from "../Input/Input"
import Image from "next/Image"
import { CldUploadButton } from "next-cloudinary"
import { Button } from "../Button"

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
                    <label
                    className="
                    block
                    text-sm
                    font-medium
                    leading-6
                    text-gray-900
                    "
                    >
                        Photo
                    </label>
                    <div className="
                    mt-2
                    flex
                    items-center
                    gap-x-3
                    ">
                        <Image 
                        width={48}
                        height={48}
                        className="rounded-full"
                        src={image||currentUser.image||'/images/placeholder.jpg'}
                        alt="Avater"
                        />
                        <CldUploadButton
                        options={{maxFiles:1}}
                        onSuccess={(result)=>{handleUpload(result)}}
                        uploadPreset="test-1"
                        >
                            <Button disabled={isLoading} secondary type="button"> Change</Button>
                        </CldUploadButton>
                    </div>

                </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button disabled={isLoading} secondary onclick={onClose}>
                            Cnacel
                        </Button>
                        <Button disabled={isLoading} type="submit">
                            Update
                        </Button>
                    </div>
            </div>
        
        </form>
    </Modal>
}
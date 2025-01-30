"use client"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

type MessageInputProps={
         id:string
         type?:string
        register: UseFormRegister<FieldValues>
        errors : FieldErrors
        required?:boolean
        placeholder?:string
}

export function MessageInput({id,type,register,errors,required,placeholder}:MessageInputProps){
    return <div className="relative w-full">
        <input type={type}  id={id} placeholder={placeholder} autoComplete={id} {...register(id,{required})}
        className="
        text-black
        font-light
        py-2
        px-4
        bg-neutral-100
        w-full
        rounded-full
        focus:outline-none
        "
        />
    </div>
}
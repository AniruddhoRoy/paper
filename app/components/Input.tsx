
"use client"

import clsx from "clsx"
import {
    FieldErrors,FieldValues,UseFormRegister
} from "react-hook-form"
type inputProps = {
    type?:string,
    label:string,
    id:string,
    required?:boolean,
    placeholder?:string,
    disable?:boolean
    register:UseFormRegister<FieldValues>
    errors:FieldErrors
}

export const Input:React.FC<inputProps> = ({type,label,placeholder,disable,id})=>{
    return <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <input type={type} placeholder={placeholder} disabled={disable}/>
    </div>
}
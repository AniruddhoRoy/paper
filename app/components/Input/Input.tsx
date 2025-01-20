
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

export const Input:React.FC<inputProps> = ({type,errors,label,required,placeholder,register,disable,id})=>{
    return <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
        <div className="mt-2">
        <input type={type} id={id} autoComplete={id} {...register(id,{required})} placeholder={placeholder} 
        className={clsx(`
            form-input
            block
            w-full
            rounded-md
            border-0
            py-1.5
            text-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6
            `,
            errors[id] && 'focus:ring-rose-500 hover:ring-rose-600',
            disable && 'opacity-50 cursor-default'
        )}
        disabled={disable}/>
        </div>
    </div>
}
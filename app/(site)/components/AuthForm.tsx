"use client"
import { Input } from "@/app/components/Input";
import {useCallback, useState} from "react"
import {useForm , FieldValues, SubmitHandler} from "react-hook-form"
type variant= 'login'|'signup';
export function AuthForm(){
    const [variant,setVariant] = useState<variant>('login');
    const [isLoading,setLoading] =useState(false);
    const toggleVariant = useCallback(()=>{
        if(variant==='login'){
            setVariant("signup")
        }else{
            setVariant('login')
        }
    },[variant])

    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:"",
            email:"",
            password:""
        }
    })
    const OnSubmit:SubmitHandler<FieldValues>=(data)=>{
        setLoading(true);

        if(variant==='login'){

        }
        if(variant==='signup'){
            
        }
    }
    const SocialAction=(action:string)=>{
        setLoading(true);
    }
    return (<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-6">
            {/* <Input placeholder="Username" label="Email" disable={isLoading}></Input> */}
        </form>
        </div>


    </div>)
}
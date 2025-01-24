"use client"
import { Button } from "@/app/components/Button";
import { Input } from "@/app/components/Input/Input";
import {useCallback, useEffect, useState} from "react"
import {useForm , FieldValues, SubmitHandler} from "react-hook-form"
import { AuthSocialButton } from "./AuthSocialButton";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import {toast} from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type variant= 'login'|'signup';
export function AuthForm(){
    const session = useSession()
    const router = useRouter()
    const [variant,setVariant] = useState<variant>('login');
    const [isLoading,setLoading] =useState(false);

    useEffect(()=>{
        if(session.status === 'authenticated'){
            router.push('/users')
        }
    },[session.status,router])

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
            signIn('credentials',{
                ...data,
                redirect:false
            }).then((callback)=>{
                if(callback?.error){
                    toast.error("Invalid Credentials")
                    
                }
                if(callback?.ok && !callback.error){
                    toast.success("Success");
                    router.push('/users')
                }
            }).finally(()=>{
                setLoading(false);
            })
        }
        if(variant==='signup'){
            axios.post('api/register',data).then(()=>{
                signIn('credentials',{...data,redirect:false})
            }).catch(()=>{
                toast.error('Something Went Wrong')
            }).finally(()=>{
                setLoading(false)
            });
        }
    }
    const SocialAction=(action:string)=>{
        setLoading(true);
        signIn(action,{redirect:false}).then((callback)=>{
            if(callback?.error){
                toast.error('something went wrong')
            }
            if(callback?.ok && !callback.error){
                toast.success('Success');
            }
        }).finally(()=>{
            setLoading(false)
        })
    }
    return (<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <div className="flex justify-center items-center text-lg font-semibold">
            <h3>{variant=='login'?"Sign in to ":"Sign up "} your account</h3>
            </div>
        <form onSubmit={handleSubmit(OnSubmit)} className="space-y-3">
            {variant==='signup' && <><Input id='name' label="Name" disable={isLoading} register={register} errors={errors}></Input></>}
            <Input id='email' type="email" label="Email" disable={isLoading} register={register} errors={errors}></Input>
            <Input id='password' type="password" label="Password" disable={isLoading} register={register} errors={errors}></Input>
            <div>
                <Button fullWidth disabled={isLoading} type="submit">{variant==='signup'?'Signup':'Login'}</Button>
            </div>
            </form>
            <div className="mt-6">
                <div className="relative">
                
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-500"/>
                    </div>
                    <div className="relative flex justify-center items-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>
                    	<div className="flex justify-center items-center mt-4 space-x-3">
                            <AuthSocialButton disabled={isLoading} icon={FaGithub} onclick={()=>SocialAction('github')}/>
                            <AuthSocialButton disabled={isLoading} icon={FaGoogle} onclick={()=>SocialAction('google')}/>
                        </div>
            </div>
            <div className="flex gap-2 justify-center text-sm mt-3 px-2 text-gray-500">
                {variant==='login'?'New to Paper messaging':"Already Have an account"}
            
            <div className="text-sky-400 underline cursor-pointer" onClick={toggleVariant}>
            {variant==='login'?'Create an account':"Login"}
            </div>
            </div>
        </div>


    </div>)
}
"use client"

import clsx from "clsx"

type buttonProps={
    children:React.ReactNode,
    type?:'submit'|'reset'|'button'|undefined,
    onclick?:()=>void,
    disabled?:boolean
    fullWidth?:boolean,
    secondary?:boolean,
    danger?:boolean
}
export const Button:React.FC<buttonProps>=(
    {children,
        type,
        onclick,
        disabled,
        fullWidth,
        secondary,
        danger
    })=>{
    return <button type={type} disabled={disabled} onClick={onclick}
    className={clsx(`
        flex
        justify-center
        rounded-md
        px-3
        py-2
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary ? 'text-gray-900':'text-white',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible::outline-rose-600',
        !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
    )}
    >
        {children}
    </button>
}
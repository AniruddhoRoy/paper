"use client"
import Link from "next/Link"
import clsx from "clsx"


type DesktopItemsProps={
    label:string,
    href:string,
    icon:any,
    active?:boolean,
    onclick?:()=>void
}

export function DesktopItems({label,href,icon:Icon,active,onclick}:DesktopItemsProps){
    const handleClick = ()=>{
        if(onclick){
            return onclick()
        }
    }
  return  (
    <li onClick={handleClick}>
        <Link href={href} className={clsx(`
            group
            flex
            gap-x-3
            rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            opacity-50
            hover:text-black
            hover:bg-gray-100
            `,
            active && "bg-gray-100 text-black  opacity-100"
  )}>
        <Icon className="w-6 h-6 shrink-0" />
        <span className="sr-only">{label}</span>
        </Link>
    </li>
  )
}
//
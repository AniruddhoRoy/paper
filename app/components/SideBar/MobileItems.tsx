"use client"

import Link from "next/link";
import clsx from "clsx";


interface MobileItemsProps{
    label:string,
    href:string,
    icon:any,
    active?:boolean,
    onclick?:()=>void;
}

const MobileItems:React.FC<MobileItemsProps> = ({
    label,
    href,
    icon:Icon,
    active,
    onclick
})=>{
    function HandleClick(){
        if(onclick)
        {
            return onclick();
        }
    }

    return <li onClick={HandleClick} className={clsx(`
    group
    flex
    gap-3
    text-sm
    leading-6
    font-semibold
    justify-center
    w-full
    p-4
  text-gray-500
  hover:text-black
  hover:bg-gray-100
    `,
    active && "text-black bg-gray-100"
    )} >
        <Link href={href}>
        <Icon className="h-6 w-6"/>
        <span className="sr-only">{label}</span>
        </Link>
    </li>
}
export { MobileItems}
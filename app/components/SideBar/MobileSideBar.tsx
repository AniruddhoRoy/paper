"use client"
import useRoutes from "@/app/hooks/useRoutes";
import { MobileItems } from "./MobileItems";
import useConversationId from "@/app/hooks/useConversation";

export function MobileSideBar(){
    const routes = useRoutes()
    const {isOpen} = useConversationId()
    if(isOpen)
    {
        return null;
    }
    return <div className="fixed flex justify-between z-40 items-center bottom-0  w-full bg-white border-t-[1px] lg:hidden ">
       <ul className="flex justify-between w-full">
       {routes.map((item)=>(
        <MobileItems 
        label={item.label} 
        href={item.href} 
        active={item.active}
        icon={item.icon}
        onclick={item.onclick}  
        key={item.label}/>
       ))}
       </ul>
    </div>
}
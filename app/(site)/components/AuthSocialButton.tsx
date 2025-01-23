import {IconType} from "react-icons"

type AuthSocialButtonProps={
    icon:IconType,
    onclick:()=>void,
    disabled?:boolean,
}


export const AuthSocialButton:React.FC<AuthSocialButtonProps>=(
    {
        icon:Icon,
        onclick,
        disabled
    }
)=>{

    return <button disabled={disabled} type="button" onClick={onclick} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset rin-gray-300 hover:bg-gray-50 focus:outline-offset-0">
       <Icon className="text-xl"/>
    </button>
}
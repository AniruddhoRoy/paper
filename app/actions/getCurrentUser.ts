import client from "../libs/prismadb";

import getSession from "./getSession";

const getCurrentUser = async ()=>{
    try{
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }
        const currentUser =await client.user.findUnique({
            where:{
                email:session.user.email
            }
        })
        if(!currentUser)
        {
            return null;
        }
        return currentUser
    }catch(err:any){
        return null;
    }
}
export {getCurrentUser}
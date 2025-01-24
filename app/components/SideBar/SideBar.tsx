import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { DesktopSideBar } from "./DesktopSideBar";
import { MobileSideBar } from "./MobileSideBar";

export async function SideBar({children}:{children:React.ReactNode}){
    const currentUser = await getCurrentUser();
    return(
        <div className="h-full">
            <DesktopSideBar currentUser={currentUser!}/>
            <MobileSideBar/>
            <main className="lg:pl-20 h-full">

            {children}
            </main>
        </div>
    )
}
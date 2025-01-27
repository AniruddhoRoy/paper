import { SideBar } from "../components/SideBar/SideBar"
import ConversationList from "./Components/ConversationList"
import { getConversations } from "../actions/getConversations"
type ConversationLayoutProps={
    children:React.ReactNode
}
export default async function ConversationLayout({children}:ConversationLayoutProps) {
    const conversations = await getConversations()
    return (
        <SideBar>
            <div className="h-full">
                <ConversationList initialItems={conversations}/>
            {children}
        </div>
        </SideBar>
    )
}
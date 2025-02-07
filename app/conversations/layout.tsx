import { SideBar } from "../components/SideBar/SideBar"
import ConversationList from "./Components/ConversationList"
import { getConversations } from "../actions/getConversations"
import getUsers from "../actions/getUsers"
type ConversationLayoutProps={
    children:React.ReactNode
}
export default async function ConversationLayout({children}:ConversationLayoutProps) {
    const conversations = await getConversations()
    const users = await getUsers()
    return (
        <SideBar>
            <div className="h-full">
                <ConversationList users = {users} initialItems={conversations}/>
            {children}
        </div>
        </SideBar>
    )
}
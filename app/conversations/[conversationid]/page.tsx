import { GetConversationById } from "@/app/actions/getConversationByid"
import { GetMessages } from "@/app/actions/getMessages"
import { EmptyState } from "@/app/components/EmptyState"
import { Header } from "./components/Header"
import { Body } from "./components/Body"
import { Form } from "./components/Form"

interface IParams{
    conversationid:string
}

const ConversationId = async ({params}:{params:IParams})=>{
    // console.log(await params.conversationid)
    const conversationId = await params; // Await the promise once
const conversation = await GetConversationById(conversationId.conversationid);
const messages = await GetMessages(conversationId.conversationid);

    // const conversation = await GetConversationById(await params.conversationid)
    // const messages = await GetMessages(await params.conversationid)
    if(!conversation){
        return (<div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState/>
                </div>
        </div>)
    }
    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation = {conversation}/>
                <Body initialMessages={messages}/>
                <Form/>
            </div>
        </div>
    )
}
export default ConversationId
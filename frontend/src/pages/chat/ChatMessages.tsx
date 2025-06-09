import type { userWithActivities } from '@/types'
import UserCard from '../cards/UserCard'
import { Scroll, Send } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useEffect, useState } from 'react'
import useChatStore from '@/stores/ChatStore'
import { useUser ,useAuth} from '@clerk/clerk-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const ChatMessages = ({receiver}:{receiver:userWithActivities}) => {
    const {getToken} = useAuth();
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const { fetchMessages,messages ,sendMessage,setMessage} = useChatStore();
    const [newMessage, setNewMessage] = useState("");
    const handleSend=()=>{
        if(!user || !receiver.clerkId)return;
        sendMessage({content:newMessage,receiverId:receiver.clerkId,senderId:user.id})
        setMessage(newMessage);
    }

    useEffect(()=>{
        async function fetchData(){
            setLoading(true);
            if(!receiver.clerkId)return;
            const token =await getToken();
            if(!token)return;
            fetchMessages(receiver.clerkId,token);
        }
        fetchData();
    },[receiver.clerkId])
  return (
    <div>

        <div>ChatMessages</div>
        <div>
           <UserCard user={receiver}/>
        </div>

        {/* show chat */}
        <ScrollArea>
            <div>
                {messages.map((message)=>{
                    return (
                        <div className='p-4 border-b border-zinc-800'>
                            <div className={`${message.senderId===user?.id?"bg-green-400":"bg-blue-400"} p-4 rounded-md ttext-white w-fit}`}>{message.content}</div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
        	<div className='p-4 mt-auto border-t border-zinc-800'>
			<div className='flex gap-2'>
				<Input
					placeholder='Type a message'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					className='bg-zinc-800 border-none'
					onKeyDown={(e) => e.key === "Enter" && handleSend()}
				/>

				<Button size={"icon"} onClick={handleSend} disabled={!newMessage.trim()}>
					<Send className='size-4' />
				</Button>
			</div>
		</div>


    </div>
  )
}

export default ChatMessages
import useChatStore from "@/stores/ChatStore";
import { useState } from "react";

export const ChatPage = () => {
  const {fetchMessages,messages}=useChatStore();
  const [receiver,setReceiver]=useState(false);
  return (
    <>
    <div className="flex flex-rows"></div>
    {/* all users */}
    <div className="flex-1/2 bg-red-400 h-full">
    hello
    </div>

    
    <div className="flex-1/2">
    {receiver?<>
    
    
    </>:<NoConversationPlaceholder/>}
    </div>
    </>
  )
}
const NoConversationPlaceholder = () => (
	<div className='flex flex-col items-center justify-center h-full space-y-6'>
		<img src='/spotify.png' alt='Spotify' className='size-16 animate-bounce' />
		<div className='text-center'>
			<h3 className='text-zinc-300 text-lg font-medium mb-1'>No conversation selected</h3>
			<p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
		</div>
	</div>
);

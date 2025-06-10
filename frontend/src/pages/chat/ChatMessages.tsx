import { useEffect, useState, useRef } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserCard from '../cards/UserCard';
import { useAuth, useUser } from '@clerk/clerk-react';
import type { userWithActivities } from '@/types';
import useChatStore from '@/stores/ChatStore';

const ChatMessages = ({ receiver }: { receiver: userWithActivities }) => {
    const { getToken } = useAuth();
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const { fetchMessages, messages, sendMessage, setMessage, newMessageIds } = useChatStore();
    const [newMessage, setNewMessage] = useState("");
    
    // Create refs for scrolling
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    // Function to scroll to bottom
    const scrollToBottom = (smooth = true) => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ 
                behavior: smooth ? 'smooth' : 'auto',
                block: 'end'
            });
        }
    };

    // Alternative method using ScrollArea viewport
    const scrollToBottomViewport = (smooth = true) => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTo({
                top: viewport.scrollHeight,
                behavior: smooth ? 'smooth' : 'auto'
            });
        }
    };
// handle timestamps
    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    };

    // Handle scroll detection to pause auto-scroll when user scrolls up
    const handleScroll = () => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            const { scrollTop, scrollHeight, clientHeight } = viewport;
            const isAtBottom = scrollHeight - scrollTop - clientHeight < 50; // 50px threshold
            setShouldAutoScroll(isAtBottom);
        }
    };

    const handleSend = () => {
        if (!user || !receiver.clerkId) return;
        sendMessage({ content: newMessage, receiverId: receiver.clerkId, senderId: user.id })
        setMessage({ content: newMessage, receiverId: receiver.clerkId, senderId: user.id });
        setNewMessage("");
        
        // Always scroll to bottom when sending a message
        setShouldAutoScroll(true);
        setTimeout(() => scrollToBottomViewport(true), 100);
    }

    // Scroll to bottom when conversation changes (new receiver)
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const token = await getToken();
            if (!token) return;
            if (!receiver.clerkId && !user) return;
            fetchMessages(token, receiver.clerkId, user.id);
        }
        fetchData();
        
        // Reset auto-scroll when switching conversations
        setShouldAutoScroll(true);
    }, [receiver.clerkId]);

    // Scroll to bottom when messages load or new messages arrive
    useEffect(() => {
        if (messages.length > 0 && shouldAutoScroll) {
            // Delay to ensure DOM is updated
            setTimeout(() => scrollToBottomViewport(false), 100);
        }
    }, [messages, shouldAutoScroll]);

    // Alternative: More aggressive auto-scroll (always scroll on new messages)
    useEffect(() => {
        if (messages.length > 0) {
            // Immediate scroll without animation for initial load
            setTimeout(() => scrollToBottomViewport(false), 50);
            
            // Smooth scroll after a brief delay for better UX
            setTimeout(() => scrollToBottomViewport(true), 150);
        }
    }, [messages.length]); // Only trigger when message count changes

    return (
        <div className='h-full flex flex-col bg-zinc-900'>
            {/* Header */}
            <div className='border-b border-zinc-700 bg-zinc-800/50 backdrop-blur-sm sticky top-0 z-10'>
                <div className='p-4'>
                    <UserCard user={receiver} />
                </div>
            </div>

            {/* Messages Container */}
            <ScrollArea 
                ref={scrollAreaRef}
                className='flex-1 h-[calc(100vh-300px)]'
                onScrollCapture={handleScroll} // Add scroll listener
            >
                <div className='p-4 space-y-4'>
                    {messages.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full text-zinc-400 py-20'>
                            <div className='w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4'>
                                <User className='w-8 h-8' />
                            </div>
                            <p className='text-lg font-medium'>Start a conversation</p>
                            <p className='text-sm'>Send a message to get started</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => {
                                // ... your existing message rendering code ...
                                const isCurrentUser = message.senderId === user?.id;
                                const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId;
                                const showTimestamp = index === 0 || 
                                    new Date(message.createdAt).getTime() - new Date(messages[index - 1].createdAt).getTime() > 300000;
                                const isNewMessage = newMessageIds?.has(message._id);

                                return (
                                    <div key={message._id} className='group'>
                                        {/* Your existing message rendering code */}
                                        {showTimestamp && (
                                            <div className='flex items-center justify-center my-4'>
                                                <div className='bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full'>
                                                    {formatTimestamp(message.createdAt)}
                                                </div>
                                            </div>
                                        )}

                                        <div className={`flex items-end gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                            {/* Avatar */}
                                            <div className={`w-8 h-8 rounded-full flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                                                {isCurrentUser ? (
                                                    <div className='w-full h-full rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium'>
                                                        {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'Y'}
                                                    </div>
                                                ) : (
                                                    <div className='w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium'>
                                                        {receiver.firstName?.charAt(0) || receiver.username?.charAt(0) || 'U'}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Message Bubble */}
                                            <div className={`max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'} flex flex-col`}>
                                                <div className={`
                                                    relative px-4 py-2 rounded-2xl text-sm leading-relaxed break-words
                                                    ${isCurrentUser 
                                                        ? 'bg-green-600 text-white rounded-br-md' 
                                                        : 'bg-zinc-800 text-zinc-100 rounded-bl-md'
                                                    }
                                                    ${showAvatar ? '' : isCurrentUser ? 'rounded-br-2xl' : 'rounded-bl-2xl'}
                                                    shadow-lg group-hover:shadow-xl transition-all duration-200
                                                    ${isNewMessage ? 'ring-1 ring-green-500/40 shadow-green-500/10' : ''}
                                                `}>
                                                    {/* New message indicator */}
                                                    {isNewMessage && (
                                                        <>
                                                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/8 to-green-400/8 animate-pulse pointer-events-none" />
                                                            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                        </>
                                                    )}
                                                    
                                                    <span className="relative z-10">{message.content}</span>
                                                </div>
                                                
                                                <div className={`
                                                    text-xs text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 
                                                    transition-opacity duration-200 ${isCurrentUser ? 'text-right' : 'text-left'}
                                                `}>
                                                    {new Date(message.createdAt).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            
                            {/* Invisible div to scroll to */}
                            <div ref={messagesEndRef} className="h-1" />
                        </>
                    )}
                </div>
            </ScrollArea>

            {/* Scroll to bottom button (optional) */}
            {!shouldAutoScroll && (
                <div className="absolute bottom-20 right-8 z-20">
                    <button
                        onClick={() => {
                            setShouldAutoScroll(true);
                            scrollToBottomViewport(true);
                        }}
                        className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-full shadow-lg transition-all duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Message Input */}
            <div className='p-4 border-t border-zinc-700 bg-zinc-800/30 backdrop-blur-sm'>
                <div className='flex gap-3 items-end'>
                    <div className='flex-1 relative'>
                        <Input
                            placeholder={`Message ${receiver.firstName || receiver.username || 'user'}...`}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className='bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 
                                     focus:border-green-500 focus:ring-green-500/20 rounded-full px-4 py-3
                                     resize-none min-h-[44px] max-h-32'
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                        />
                    </div>

                    <Button 
                        size="icon" 
                        onClick={handleSend} 
                        disabled={!newMessage.trim()}
                        className={`
                            w-11 h-11 rounded-full transition-all duration-200
                            ${newMessage.trim() 
                                ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/25' 
                                : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                            }
                        `}
                    >
                        <Send className='w-4 h-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ChatMessages;

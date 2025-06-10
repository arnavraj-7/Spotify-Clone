import { useEffect, useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserCard from "../cards/UserCard";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { Message, userWithActivities } from "@/types";
import useChatStore from "@/stores/ChatStore";
import { motion, AnimatePresence } from "framer-motion";


// Loading Skeleton Components
const MessageSkeleton = ({ isCurrentUser = false }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={`flex items-end gap-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
  >
    {/* Avatar skeleton */}
    <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
    
    {/* Message bubble skeleton */}
    <div className={`max-w-[70%] ${isCurrentUser ? "items-end" : "items-start"} flex flex-col`}>
      <div
        className={`
          px-4 py-2 rounded-2xl animate-pulse
          ${isCurrentUser ? "bg-zinc-700 rounded-br-md" : "bg-zinc-800 rounded-bl-md"}
        `}
      >
        <div className={`h-4 bg-zinc-600 rounded ${Math.random() > 0.5 ? 'w-32' : 'w-48'}`} />
        {Math.random() > 0.7 && (
          <div className="h-4 bg-zinc-600 rounded w-24 mt-1" />
        )}
      </div>
    </div>
  </motion.div>
);

const ChatLoadingSkeleton = () => (
  <div className="p-4 space-y-4">
    {[...Array(8)].map((_, index) => (
      <MessageSkeleton key={index} isCurrentUser={index % 3 === 0} />
    ))}
  </div>
);

const ChatMessages = ({ receiver }: { receiver: userWithActivities }) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { 
    fetchMessages, 
    sendMessage, 
    addMessagetoConversation,
    conversations,
    activeConversation,
    isLoadingMessages
  } = useChatStore();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  // Create refs for scrolling
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Animation variants
  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 }
    },
    blur: {
      scale: 1,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { type: "spring", stiffness: 400 }
    },
    tap: { scale: 0.95 },
    disabled: { scale: 0.95, opacity: 0.6 }
  };

  // handle timestamps
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  };

  // Scroll to bottom when conversation changes (new receiver)
  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      if (!token || !receiver?.clerkId || !user?.id) return;
      await fetchMessages(token, receiver.clerkId, user.id);
    }

    fetchData();
    setShouldAutoScroll(true);
  }, [receiver.clerkId, user?.id, getToken, fetchMessages]);

  useEffect(() => {
    if (activeConversation && conversations[activeConversation]) {
      setMessages(conversations[activeConversation]);
    }
  }, [conversations, activeConversation]);

  // Handle scroll detection to pause auto-scroll when user scrolls up
  const handleScroll = () => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShouldAutoScroll(isAtBottom);
    }
  };

  const handleSend = () => {
    if (!user || !receiver.clerkId || !activeConversation || !newMessage.trim()) return;
    
    const messageData = {
      content: newMessage,
      receiverId: receiver.clerkId,
      senderId: user.id,
      createdAt: new Date(),
    };
    
    sendMessage(messageData);
    addMessagetoConversation(messageData, activeConversation);
    setNewMessage("");

    setShouldAutoScroll(true);
    setTimeout(() => scrollToBottomViewport(true), 100);
  };

  // Scroll to bottom when messages load or new messages arrive
  useEffect(() => {
    if (messages.length > 0 && shouldAutoScroll) {
      setTimeout(() => scrollToBottomViewport(false), 100);
    }
  }, [messages, shouldAutoScroll]);

  const scrollToBottomViewport = (smooth = true) => {
    const viewport = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]"
    );
    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  return (
    <motion.div 
      className="h-full flex flex-col bg-zinc-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="border-b border-zinc-700 bg-zinc-800/50 backdrop-blur-sm sticky top-0 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="p-4">
          <UserCard user={receiver} />
        </div>
      </motion.div>

      {/* Messages Container */}
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 h-[calc(100vh-300px)]"
        onScrollCapture={handleScroll}
      >
        <AnimatePresence mode="wait">
          {isLoadingMessages ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ChatLoadingSkeleton />
            </motion.div>
          ) : (
            <motion.div 
              key="messages"
              className="p-4 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {messages.length === 0 ? (
                <motion.div 
                  className="flex flex-col items-center justify-center h-full text-zinc-400 py-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <User className="w-8 h-8" />
                  </motion.div>
                  <motion.p 
                    className="text-lg font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Start a conversation
                  </motion.p>
                  <motion.p 
                    className="text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Send a message to get started
                  </motion.p>
                </motion.div>
              ) : (
                <>
                  <AnimatePresence>
                    {messages.map((message, index) => {
                      if(!message.createdAt) return null;
                      const isCurrentUser = message.senderId === user?.id;
                      const showAvatar =
                        index === 0 ||
                        messages[index - 1].senderId !== message.senderId;
                      const showTimestamp =
                        index === 0 ||
                        new Date(message.createdAt).getTime() -
                          new Date(messages[index - 1].createdAt).getTime() >
                          300000;
                      
                      // Fixed: Only show new message styling for received messages
                      const isNewMessage = !message.seen && message.senderId !== user?.id;

                      return (
                        <motion.div 
                          key={message._id} 
                          className="group"
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                        >
                          {showTimestamp && (
                            <motion.div 
                              className="flex items-center justify-center my-4"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full">
                                {formatTimestamp(String(message.createdAt))}
                              </div>
                            </motion.div>
                          )}

                          <div
                            className={`flex items-end gap-2 ${
                              isCurrentUser ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            {/* Avatar */}
                            <motion.div
                              className={`w-8 h-8 rounded-full flex-shrink-0 ${
                                showAvatar ? "opacity-100" : "opacity-0"
                              }`}
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              {isCurrentUser ? (
                                <div className="w-full h-full rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-medium">
                                  {user?.firstName?.charAt(0) ||
                                    "Y"}
                                </div>
                              ) : (
                                <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                                  {receiver.firstName?.charAt(0) ||
                                    "U"}
                                </div>
                              )}
                            </motion.div>

                            {/* Message Bubble */}
                            <div
                              className={`max-w-[70%] ${
                                isCurrentUser ? "items-end" : "items-start"
                              } flex flex-col`}
                            >
                              <motion.div
                                className={`
                                  relative px-4 py-2 rounded-2xl text-sm leading-relaxed break-words
                                  ${
                                    isCurrentUser
                                      ? "bg-green-600 text-white rounded-br-md"
                                      : "bg-zinc-800 text-zinc-100 rounded-bl-md"
                                  }
                                  ${
                                    showAvatar
                                      ? ""
                                      : isCurrentUser
                                      ? "rounded-br-2xl"
                                      : "rounded-bl-2xl"
                                  }
                                  shadow-lg group-hover:shadow-xl transition-all duration-200
                                  ${
                                    isNewMessage
                                      ? "ring-1 ring-blue-500/40 shadow-blue-500/10"
                                      : ""
                                  }
                                `}
                                whileHover={{ 
                                  scale: 1.02,
                                  transition: { type: "spring", stiffness: 400 }
                                }}
                                layout
                              >
                                {/* New message indicator - only for received messages */}
                                {isNewMessage && (
                                  <>
                                    <motion.div 
                                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/8 to-blue-400/8 pointer-events-none"
                                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                                      transition={{ 
                                        duration: 2, 
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                      }}
                                    />
                                    <motion.div 
                                      className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-400 rounded-full"
                                      animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [0.7, 1, 0.7]
                                      }}
                                      transition={{ 
                                        duration: 1.5, 
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                      }}
                                    />
                                  </>
                                )}

                                <span className="relative z-10">
                                  {message.content}
                                </span>

                                {/* Status indicators for sent messages */}
                                {isCurrentUser && (
                                  <motion.div 
                                    className="flex items-center justify-end mt-1 gap-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                  >
                                    <span className="text-xs text-green-200">
                                      {new Date(message.createdAt).toLocaleTimeString(
                                        "en-US",
                                        {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                        }
                                      )}
                                    </span>
                                    {/* Delivery status */}
                                    <div className="flex">
                                      {message.delivered ? (
                                        <motion.svg 
                                          className="w-3 h-3 text-green-200" 
                                          fill="currentColor" 
                                          viewBox="0 0 20 20"
                                          initial={{ scale: 0 }}
                                          animate={{ scale: 1 }}
                                          transition={{ type: "spring", stiffness: 500, delay: 0.3 }}
                                        >
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </motion.svg>
                                      ) : (
                                        <motion.svg 
                                          className="w-3 h-3 text-green-300" 
                                          fill="currentColor" 
                                          viewBox="0 0 20 20"
                                          animate={{ rotate: 360 }}
                                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </motion.svg>
                                      )}
                                      {/* Double tick for seen */}
                                      {message.seen && (
                                        <motion.svg 
                                          className="w-3 h-3 text-blue-400 -ml-1" 
                                          fill="currentColor" 
                                          viewBox="0 0 20 20"
                                          initial={{ scale: 0, x: 5 }}
                                          animate={{ scale: 1, x: 0 }}
                                          transition={{ type: "spring", stiffness: 500, delay: 0.4 }}
                                        >
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </motion.svg>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </motion.div>

                              {/* Timestamp for received messages */}
                              {!isCurrentUser && (
                                <motion.div 
                                  className="text-xs text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                  initial={{ opacity: 0 }}
                                  whileHover={{ opacity: 1 }}
                                >
                                  {new Date(message.createdAt).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Invisible div to scroll to */}
                  <div ref={messagesEndRef} className="h-1" />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Scroll to bottom button */}
      <AnimatePresence>
        {!shouldAutoScroll && (
          <motion.div 
            className="absolute bottom-20 right-8 z-20"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <motion.button
              onClick={() => {
                setShouldAutoScroll(true);
                scrollToBottomViewport(true);
              }}
              className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-full shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Input */}
      <motion.div 
        className="p-4 border-t border-zinc-700 bg-zinc-800/30 backdrop-blur-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <motion.div
              variants={inputVariants}
              whileFocus="focus"
              initial="blur"
            >
              <Input
                placeholder={`Message ${
                  receiver.firstName || "user"
                }...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400 
                         focus:border-green-500 focus:ring-green-500/20 rounded-full px-4 py-3
                         resize-none min-h-[44px] max-h-32"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </motion.div>
          </div>

          <motion.div
            variants={buttonVariants}
            animate={
              newMessage.trim() 
                ? "idle" 
                : "disabled"
            }
            whileHover={newMessage.trim() ? "hover" : "disabled"}
            whileTap={newMessage.trim() ? "tap" : "disabled"}
          >
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className={`
                w-11 h-11 rounded-full transition-all duration-200
                ${
                  newMessage.trim()
                    ? "bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/25"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }
              `}
            >
              <motion.div
                animate={newMessage.trim() ? { rotate: 0 } : { rotate: -90 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Send className="w-4 h-4" />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatMessages;
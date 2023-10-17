"use client"
import { createContext,useState } from "react"

export const chatListContext = createContext<ChatList | null>(null);

const ChatListProvider = ({children,defaultChatList = []}:{children:React.ReactNode,defaultChatList?:ChatItem[]}) => {
  const [chats,setChats] = useState<ChatItem[]>(defaultChatList);
  return (
  <chatListContext.Provider value={{chats,setChats}}>
  {children}
  </chatListContext.Provider>
  )
}

export default ChatListProvider; 

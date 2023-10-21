"use client"
import { createContext,useState } from "react"

export const chatListContext = createContext<ChatList | null>(null);

const ChatListProvider = ({children,defaultChatList = []}:{children:React.ReactNode,defaultChatList?:ChatItem[]}) => {
  const [chats,setChats] = useState<ChatItem[]>(defaultChatList);
  
  const addChatToList = (chat:ChatItem) => {
    setChats((prev:ChatItem[]) => {
      const newChats = chats.filter(item => {
        return item.id !== chat.id as string;
      });
        
      if(newChats.length <= 0) return [chat];
      return [chat,...newChats]
    });
  } 
  return (
  <chatListContext.Provider value={{chats,setChats,addChatToList}}>
  {children}
  </chatListContext.Provider>
  )
}

export default ChatListProvider; 

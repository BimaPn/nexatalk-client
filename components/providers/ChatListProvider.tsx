"use client"
import { createContext,useState } from "react"

export const chatListContext = createContext<ChatList | null>(null);

const ChatListProvider = ({children}:{children:React.ReactNode}) => {
  const [chatlists, setChatlists] = useState<ChatItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  const addChatToList = (chat:ChatItem) => {
    let isOnline:boolean;
    setChatlists((prev:ChatItem[]) => {
      const newChatlists = chatlists.filter(item => {
        if(item.username === chat.username) isOnline = item.isOnline;
        return item.username !== chat.username as string;
      });
      chat.isOnline = isOnline;  
      if(newChatlists.length <= 0) return [chat];
      return [chat,...newChatlists]
    });
  } 
  
  const clearUnreadCount = (targetId:string) => {
    setChatlists((prev:ChatItem[]) => {
      return prev.map((item) => {
        if(item.username === targetId) item.unread = undefined;
        return item;
      });
    });
  }
  const setOnlineUser = (username:string,isOnline:boolean) => {
    setChatlists((prev:ChatItem[]) => {
      return prev.map((item) => {
        if(item.username === username) item.isOnline = isOnline;
        return item;
      });
    });
  }
  return (
  <chatListContext.Provider value={{chatlists,setChatlists,addChatToList,clearUnreadCount,setOnlineUser,isLoaded,setIsLoaded}}>
  {children}
  </chatListContext.Provider>
  )
}

export default ChatListProvider; 

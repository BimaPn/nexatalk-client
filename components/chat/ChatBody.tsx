"use client"
import UserMessage from "../ui/message/UserMessage"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect, useContext } from "react"
import { chatListContext } from "../providers/ChatListProvider"
import { Socket } from "socket.io-client"
import MediaMessage from "../ui/message/MediaMessage"
import FriendRequest from "../ui/FriendRequest"

type ChatBodyT = {
  accessToken:string,
  userTarget:UserTarget,
  defaultMessages?:UserMessage[],
  isOnline:boolean,
  socket:Socket
}

const ChatBody = ({accessToken,userTarget,defaultMessages=[],isOnline,socket}:ChatBodyT) => { 
  const messageContainer = useRef<HTMLUListElement | null>(null);
  const [messages,setMessages] = useState<(UserMessage|MediaMessage)[]>(defaultMessages);
  const { chatlists, addChatToList,clearUnreadCount } = useContext(chatListContext) as ChatList
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {    
    const receiveMessage = ({content,from}:{content:{message?:string,images?:string[]},from:ChatItem}) => {
      if(from.username !== userTarget.username) return;
      const userMessage = {
       ...content,
       isCurrentUser:false,
       createdAt:from.createdAt
      } 
      setMessages(prev => [...prev,userMessage as any]);
      socket.emit("messagesRead",userTarget.id);
      clearUnreadCount(userTarget.username);
    }  
    const typingListening = (from: string, isTyping:boolean) => {
      console.log(isTyping)
      setIsTyping(isTyping);
    }
    socket.on("message", receiveMessage);
    socket.emit("messagesRead",userTarget.id);
    socket.on("typing",typingListening);
    clearUnreadCount(userTarget.username);
    return () => {
      socket.off("message", receiveMessage);
      socket.off("typing", typingListening);
    }
  },[]);

  useEffect(() => {
    messageContainer!.current!.scrollTop = messageContainer!.current!.scrollHeight;
  },[messages]);

  const sendMessage = (message:UserMessage|MediaMessage) => {
    socket.emit("message",{message,to:userTarget.id});
    setMessages(prev => [...prev,message]);

    let newChat:ChatItem = {
      username:userTarget.username,
      avatar:userTarget.avatar,
      name:userTarget.name,
      createdAt:message.createdAt,
      message:"message" in message ? message.message : "images",
      isOnline:false,
    }    
      
    addChatToList(newChat); 
  }
  const onTyping = (isTyping:boolean) => {
    socket.emit("typing",userTarget.id, isTyping);
  }
  return (
    <div className="h-full sm:h-[92%] bg-light dark:bg-dark-dark flex flex-col overflow-hidden rounded-t-2xl rounded-b-none sm:rounded-2xl m-0 sm:mx-3 relative">
      <FriendRequest socket={socket} target={userTarget.id as string} />
      <ul ref={messageContainer} className="w-full h-full overflow-y-auto flex flex-col gap-4 px-3 pt-4 custom-scrollbar scroll-smooth">

        {messages.map((msg,index) => {
          return (
            <li key={index}>
            {((index > 0 && msg.date !== messages[index-1].date) || index == 0)  && (
              <div className="w-full flexCenter">
                <span className="bg-white dark:bg-dark-semiDark text-xs px-3 py-[6px] rounded-full">{msg.date}</span>
              </div>
            )}
            {"message" in msg ? (
              <div  className={`w-full flex ${msg.isCurrentUser ? "justify-end":"justify-start"}`}>
                <UserMessage
                id={msg.id}
                message={msg.message}
                createdAt={msg.createdAt}
                isCurrentUser={msg.isCurrentUser}/>
              </div>
            ) : (
              <div>
                <MediaMessage
                media={msg.media as string[]} 
                createdAt={msg.createdAt} 
                isCurrentUser={msg.isCurrentUser} />
              </div>
            )}
            </li>
          )
        })}
        {isTyping && (
        <li className="w-fit px-3 flexCenter gap-[6px] py-[13px] dark:bg-dark-netral rounded-xl">
          <span className={`w-[7px] aspect-square rounded-full bg-white custom-animate-bounce !delay-100`}/>
          <span className={`w-[7px] aspect-square rounded-full bg-white custom-animate-bounce !delay-300`}/>
          <span className={`w-[7px] aspect-square rounded-full bg-white custom-animate-bounce !delay-500`}/>
        </li>
        )}

      </ul>
      <div className="w-full">
          <ChatInput onTyping={(isTyping) => onTyping(isTyping)} targetId={userTarget.id as string} setMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatBody



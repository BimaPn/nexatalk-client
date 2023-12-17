"use client"
import UserMessage from "../ui/message/UserMessage"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect, useContext } from "react"
import { chatListContext } from "../providers/ChatListProvider"
import { chatSocket } from "../menu/ChatMenu"
import ImagesMessage from "../ui/message/ImagesMessage"

const ChatBody = ({accessToken,userTarget,defaultMessages=[],isOnline}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[],isOnline:boolean}) => { 
  const chatBody = useRef<HTMLDivElement | null>(null);
  const [messages,setMessages] = useState<(UserMessage|ImagesMessage)[]>(defaultMessages);
  const { chats,addChatToList,clearUnreadCount } = useContext(chatListContext) as ChatList
  useEffect(() => {     
    chatSocket.on("message",({content,from}:{content:{message?:string,images?:string[]},from:ChatItem}) => {
      if(from.id !== userTarget.id) return;
      const userMessage = {
       ...content,
       isCurrentUser:false,
       createdAt:from.createdAt
      } 
      setMessages(prev => [...prev,userMessage as any]);
      chatSocket.emit("messagesRead",userTarget.id);
      clearUnreadCount(userTarget.id);
    });

    chatSocket.emit("messagesRead",userTarget.id);
    clearUnreadCount(userTarget.id);
    return () => {
      chatSocket.disconnect();
    }
  },[]);

  useEffect(() => {
    chatBody!.current!.scrollTop = chatBody!.current!.scrollHeight;
  },[messages]);

  const sendMessage = (msg:UserMessage|ImagesMessage) => {
    chatSocket.emit("message",{message:msg,to:userTarget.id});

    if(!("message" in msg)) {
      const images = msg.images as File[];
      msg.images = images.map((file:File) => URL.createObjectURL(file));
    }

    setMessages(prev => [...prev,msg]);

    let newChat:ChatItem = {
      id:userTarget.id,
      avatar:userTarget.avatar,
      name:userTarget.name,
      createdAt:msg.createdAt,
      message:"message" in msg ? msg.message : "images",
      isOnline:false,
    }    
      
    addChatToList(newChat); 
  }
  return (
    <div ref={chatBody} className="max-h-full bg-light flex flex-col overflow-hidden rounded-xl m-0 sm:mx-3">
      <ul className="w-full h-full overflow-y-auto flex flex-col gap-5 px-3 pt-4 custom-scrollbar">
        <div className="w-full flexCenter">
          <span className="bg-white text-sm px-4 py-1 rounded-full">Today</span>
        </div>
        {messages.map((msg,index) => {
          return "message" in msg ? (
              <li key={index} className={`w-full flex ${msg.isCurrentUser ? "justify-end":"justify-start"}`}>
                < UserMessage
                message={msg.message}
                createdAt={msg.createdAt}
                isCurrentUser={msg.isCurrentUser}/>
            </li>
          ) : 
            <li key={index}>
              <ImagesMessage
              images={msg.images as string[]} 
              createdAt={msg.createdAt} 
              isCurrentUser={msg.isCurrentUser} />
            </li>
        })}
      </ul>
      <div className="w-full">
          <ChatInput setMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatBody

"use client"
import UserMessage from "../ui/message/UserMessage"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect, useContext } from "react"
import { chatListContext } from "../providers/ChatListProvider"
import { chatSocket } from "../menu/ChatMenu"
import ImagesMessage from "../ui/message/ImagesMessage"

const ChatBody = ({accessToken,userTarget,defaultMessages=[]}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[]}) => { 
  const chatBody = useRef<HTMLDivElement | null>(null);
  const [messages,setMessages] = useState<(UserMessage|ImagesMessage)[]>(defaultMessages);
  const { chats,addChatToList,clearUnreadCount } = useContext(chatListContext) as ChatList
  useEffect(() => {     
    chatSocket.on("message",({message,from}:{message:string,from:ChatItem}) => {
      if(from.id !== userTarget.id) return;
      const userMessage:UserMessage = {
       message:message,
       isCurrentUser:false,
       createdAt:from.createdAt
      } 
      setMessages(prev => [...prev,userMessage]);
    });

    // Clear unread messages from this room
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

    setMessages(prev => [...prev,msg]);
    
    if("message" in msg) {
      chatSocket.emit("message",{message:msg,to:userTarget.id});
    }
      
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
    <div ref={chatBody} className="w-full h-full bg-light flex flex-col rounded-t-xl overflow-auto relative">
    <ul className="w-full h-full flex flex-col gap-5 px-5 py-4">
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
      ) : <ImagesMessage src={msg.images[0]} createdAt={msg.createdAt} isCurrentUser={msg.isCurrentUser} />
    })}
    </ul>
    <div className="w-full absolute bottom-0 flexCenter">
      <div className="fixed w-full ss:w-[90%] sm:w-[55%] lg:w-[65%] xxl:w-[70%] bottom-0">
        <ChatInput setMessage={sendMessage} />
      </div>
    </div>
    </div>
  )
}

export default ChatBody

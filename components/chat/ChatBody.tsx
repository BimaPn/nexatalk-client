"use client"
import UserMessage from "../ui/message/UserMessage"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect, useContext } from "react"
import { chatListContext } from "../providers/ChatListProvider"
import { chatSocket } from "../menu/ChatMenu"

const ChatBody = ({accessToken,userId,defaultMessages=[]}:{accessToken:string,userId:string,defaultMessages?:UserMessage[]}) => { 
  const chatBody = useRef<HTMLDivElement | null>(null);
  const [messages,setMessages] = useState(defaultMessages);
  const { chats,addChatToList } = useContext(chatListContext) as ChatList
  useEffect(() => {
    chatSocket.on("message",({message,from}:{message:string,from:ChatItem}) => {
      if(from.id === userId) {
        const userMessage:UserMessage = {
         message:message,
         isCurrentUser:false,
         time:from.time
        } 
        setMessages(prev => [...prev,userMessage]);
      }
    });
    return () => {
      chatSocket.disconnect();
    }
  },[]);

  useEffect(() => {
    chatBody!.current!.scrollTop = chatBody!.current!.scrollHeight;
  },[messages]);

  const sendMessage = (msg:UserMessage) => {
    chatSocket.emit("message",{message:msg,to:userId});
    setMessages(prev => [...prev,msg]);

    // Add to chat list
    let newChat:ChatItem = {
      id:userId,
      image:"/images/people/1.jpg",
      name:"dadang",
      time:msg.time,
      message:msg.message,
    }    
      
    addChatToList(newChat); 
  }

  return (
    <div ref={chatBody} className="w-full h-full bg-light flex flex-col rounded-t-xl overflow-auto relative">
    <ul className="w-full h-full flex flex-col gap-5 px-5 py-4">
    <div className="w-full flexCenter">
      <span className="bg-white text-sm px-4 py-1 rounded-full">Today</span>
    </div>
    {messages.map((msg,index) => (
    <li key={index} className={`w-full flex ${msg.isCurrentUser ? "justify-end":"justify-start"}`}>
      < UserMessage
      message={msg.message}
      time={msg.time}
      isCurrentUser={msg.isCurrentUser}/>
    </li>
    ))}
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

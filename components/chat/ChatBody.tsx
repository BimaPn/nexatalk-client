"use client"
import {messages as fakeMessages} from "@/data/dummies/chatting"
import GroupMessage from "../ui/message/GroupMessage"
import Message from "../ui/message/Message"
import UserMessage from "../ui/message/UserMessage"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect } from "react"

const ChatBody = () => { 
  const chatBody = useRef<HTMLDivElement | null>(null);
  const [messages,setMessages] = useState<GroupMessage[]>(fakeMessages)
  useEffect(() => {
    chatBody!.current!.scrollTop = chatBody!.current!.scrollHeight;
  },[messages]);
  return (
    <div ref={chatBody} className="w-full h-full bg-light rounded-t-xl overflow-auto relative">
    <ul className="w-full flex flex-col gap-5 px-5 py-4">
    <div className="w-full flexCenter">
      <span className="bg-white text-sm px-4 py-1 rounded-full">Today</span>
    </div>
    {fakeMessages.map(message => (
      <li className={`w-full flex ${message.isCurrentUser ? "justify-end":"justify-start"}`}>
        <GroupMessage 
        key={message.id} 
        id={message.id} 
        isCurrentUser={message.isCurrentUser} 
        time={message.time} 
        message={message.message} 
        name={message.name} 
        image={message.image}/>
      </li>
    ))}
    {messages.map((message,index) => (
      <li className={`w-full flex ${message.isCurrentUser ? "justify-end":"justify-start"}`}>
        <GroupMessage 
        key={index} 
        id={message.id} 
        isCurrentUser={message.isCurrentUser} 
        time={message.time} 
        message={message.message} 
        name={message.name} 
        image={message.image}/>
      </li>
    ))}
    </ul>
      <div className="sticky bottom-0 left-0 right-0">
        <ChatInput setMessage={(msg) => setMessages(prev => [...prev,msg])} />
      </div>
    </div>
  )
}

export default ChatBody

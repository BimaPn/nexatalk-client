"use client"
import {messages as fakeMessages} from "@/data/dummies/chatting"
import GroupMessage from "../ui/message/GroupMessage"
import Message from "../ui/message/Message"
import UserMessage from "../ui/message/UserMessage"
import { Socket } from "socket.io-client"
import socketInit from "@/app/api/socket/socket"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect } from "react"
import ApiClient from "@/app/api/axios/ApiClient"
import { getCurrentTime } from "@/utils/converter"

let socket:Socket;

const ChatBody = ({accessToken,userId,defaultMessages=[]}:{accessToken:string,userId:string,defaultMessages?:UserMessage[]}) => { 
  const chatBody = useRef<HTMLDivElement | null>(null);
  const [messages,setMessages] = useState(defaultMessages);
  useEffect(() => {
    socket = socketInit("/chat",accessToken);
    socket.on("message",({message,from}:{message:string,from:string}) => {
      if(from === userId) {
        const userMessage:UserMessage = {
         message:message,
         isCurrentUser:false,
         time:getCurrentTime()
        } 
        setMessages(prev => [...prev,userMessage]);
      }
    });
    return () => {
      socket.disconnect();
    }
  },[]);

  useEffect(() => {
    chatBody!.current!.scrollTop = chatBody!.current!.scrollHeight;
  },[messages]);
  const sendMessage = (msg:UserMessage) => {
    socket.emit("message",{message:msg.message,to:userId});
    setMessages(prev => [...prev,msg]);
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

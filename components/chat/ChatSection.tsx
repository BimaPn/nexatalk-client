"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext, useEffect, useState } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"
import { Socket } from "socket.io-client"
import { SocketProvider, socketContext } from "../providers/SocketProvider"

const ChatSection = ({accessToken,userTarget,defaultMessages,isOnline}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[],isOnline:boolean}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  const { socket, isConnected, setIsConnected } = useContext(socketContext) as SocketProvider;
  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  },[]);

  return isConnected && (
    <section className={`w-full h-full flex flex-col bg-white rounded-xl shadow relative sm:pb-3 overflow-hidden ${isOpen && "hidden lg:block"}`}>
      <ChatHeader 
      username={userTarget.username} 
      avatar={userTarget.avatar} 
      name={userTarget.name}
      isOnline={isOnline}
      socket={socket}/>
      
      <div className="w-full h-full flex flex-col overflow-hidden">
      <ChatBody
      isOnline={isOnline}
      userTarget={userTarget}
      accessToken={accessToken} 
      defaultMessages={defaultMessages}
      socket={socket}/>
      </div>

    </section>
  )
}

export default ChatSection

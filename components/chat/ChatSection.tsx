"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext, useEffect, useState } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"
import { Socket } from "socket.io-client"
import { SocketProvider, socketContext } from "../providers/SocketProvider"
import ChatSectionSkeleton from "../skeletons/ChatSectionSkeleton"

const ChatSection = ({accessToken,userTarget,defaultMessages,isOnline}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[],isOnline:boolean}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  const { socket, isConnected } = useContext(socketContext) as SocketProvider;

  return (
    <section className={`w-full h-full flex flex-col bg-white rounded-none sm:rounded-xl relative sm:pb-3 overflow-hidden ${isOpen && "hidden lg:block"}`}>
      {isConnected ? (
        <>
        <ChatHeader 
        username={userTarget.username} 
        avatar={userTarget.avatar} 
        name={userTarget.name}
        isOnline={isOnline}
        socket={socket}
        />
        
        <ChatBody
        isOnline={isOnline}
        userTarget={userTarget}
        accessToken={accessToken} 
        defaultMessages={defaultMessages}
        socket={socket}
        />
        </>
      ) : (
      <ChatSectionSkeleton />
      )}
    </section>
  )
}

export default ChatSection

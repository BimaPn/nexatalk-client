"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext, useEffect, useState } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"
import { Socket } from "socket.io-client"
import { SocketProvider, socketContext } from "../providers/SocketProvider"
import ChatSectionSkeleton from "../skeletons/ChatSectionSkeleton"

const ChatSection = ({accessToken,userTarget,isOnline}:{accessToken:string,userTarget:UserTarget,isOnline:boolean}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  const { chatSocket } = useContext(socketContext) as SocketProvider;
  return chatSocket && (
    <section className={`w-full h-full flex flex-col bg-white dark:bg-dark-semiDark rounded-none sm:rounded-2xl relative overflow-hidden ${isOpen && "hidden lg:block"}`}>
        <ChatHeader 
        username={userTarget.username} 
        avatar={userTarget.avatar} 
        name={userTarget.name}
        isOnline={isOnline}
        socket={chatSocket}
        />
        <ChatBody
        isOnline={isOnline}
        userTarget={userTarget}
        accessToken={accessToken} 
        socket={chatSocket}
        />
    </section>
  )
}

export default ChatSection

"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext, useEffect, useState } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"
import { Socket } from "socket.io-client"
import { SocketProvider, socketContext } from "../providers/SocketProvider"

let chatSocket:Socket;

const ChatSection = ({accessToken,userTarget,defaultMessages,isOnline}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[],isOnline:boolean}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  const { getSocket } = useContext(socketContext) as SocketProvider;
  const [isLoaded,setIsLoaded] = useState<boolean>(false); 

  useEffect(() => {
    chatSocket = getSocket("/chat",accessToken);
    setIsLoaded(true);
  },[]);

  return isLoaded && (
    <section className={`w-full h-full flex flex-col bg-white rounded-xl shadow relative sm:pb-3 overflow-hidden ${isOpen && "hidden lg:block"}`}>
      <ChatHeader 
      username={userTarget.username} 
      avatar={userTarget.avatar} 
      name={userTarget.name}
      isOnline={isOnline}
      socket={chatSocket}/>
      
      <div className="w-full h-full flex flex-col overflow-hidden">
      <ChatBody
      isOnline={isOnline}
      userTarget={userTarget}
      accessToken={accessToken} 
      defaultMessages={defaultMessages}
      socket={chatSocket}/>
      </div>

    </section>
  )
}

export default ChatSection

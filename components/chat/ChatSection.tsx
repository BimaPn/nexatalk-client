"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"

const ChatSection = ({accessToken,userTarget,defaultMessages,isOnline}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[],isOnline:boolean}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  return (
    <section className={`w-full h-full flex flex-col bg-white rounded-xl shadow relative sm:pb-3 overflow-hidden ${isOpen && "hidden lg:block"}`}>
      <ChatHeader 
      userId={userTarget.id} 
      avatar={userTarget.avatar} 
      name={userTarget.name}
      isOnline={isOnline}/>
      
      <div className="w-full h-full flex flex-col  overflow-hidden">
      <ChatBody
      isOnline={isOnline}
      userTarget={userTarget}
      accessToken={accessToken} 
      defaultMessages={defaultMessages} />
      </div>

    </section>
  )
}

export default ChatSection

"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"

const ChatSection = ({accessToken,userTarget,defaultMessages}:{accessToken:string,userTarget:UserTarget,defaultMessages?:UserMessage[]}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  return (
    <section className={`w-full h-full flex flex-col relative ${isOpen && "hidden lg:block"}`}>
      <ChatHeader  />
      <ChatBody userTarget={userTarget} accessToken={accessToken} defaultMessages={defaultMessages} />
    </section>
  )
}

export default ChatSection

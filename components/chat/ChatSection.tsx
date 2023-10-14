"use client"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"
import ChatHeader from "./ChatHeader"
import ChatBody from "./ChatBody"

const ChatSection = ({accessToken,userId,defaultMessages}:{accessToken:string,userId:string,defaultMessages?:UserMessage[]}) => {
  const { isOpen } = useContext(profileDetailContext) as ProfileDetail;
  return (
    <section className={`w-full h-full flex flex-col relative ${isOpen && "hidden lg:block"}`}>
      <ChatHeader  />
      <ChatBody userId={userId} accessToken={accessToken} defaultMessages={defaultMessages} />
    </section>
  )
}

export default ChatSection

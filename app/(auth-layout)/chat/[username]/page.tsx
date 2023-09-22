"use client"
import ChatHeader from '@/components/chat/ChatHeader'
import ChatBody from '@/components/chat/ChatBody'
import ChatInput from '@/components/chat/ChatInput'
import {useState} from "react"
import ProfileInfo from '@/components/menu/ProfileInfo'

const page = () => {
  const [isOpenProfile,setIsOpenProfile] = useState<boolean>(false);
  return (
  <div className="w-full bg-white h-screen flex">
    <section className={`w-full h-full flex flex-col relative ${isOpenProfile && "hidden lg:block"}`}>
      <ChatHeader onOpenProfile={(isOpen) => setIsOpenProfile(isOpen)} />
      <ChatBody />
    </section>
    {isOpenProfile && (
      <div className={`w-full lg:w-[512px]`}>
        <ProfileInfo onClose={(close) => setIsOpenProfile(close)}/>
      </div>
    )}
  </div>
  )
}

export default page

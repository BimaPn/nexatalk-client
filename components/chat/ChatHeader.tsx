"use client"
import RoundedImage from "../ui/RoundedImage"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsTelephone } from "react-icons/bs"
import { HiOutlineVideoCamera } from "react-icons/hi2"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext,useEffect,useState } from "react"
import { UserAvatar } from "../ui/ChatItem"
import { Socket } from "socket.io-client"

type ChatHeaderT = {
  username:string,
  avatar:string,
  name:string,
  isOnline:boolean,
  socket:Socket
}

const ChatHeader = ({username,avatar,name,isOnline,socket}:ChatHeaderT) => {
  const { setIsOpen } = useContext(profileDetailContext) as ProfileDetail;
  const [isUserOnline,setIsUserOnline] = useState(isOnline);
  const openProfileInfo = (e:React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }
  useEffect(() => {
    const checkOnline = (target: string,isOnline: boolean) => {
      if(target === username) setIsUserOnline(isOnline);
    } 
    socket.on("onlineUser", checkOnline);

    return () => {
      socket.off("onlineUser", checkOnline);
    }
  },[]);
  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div onClick={openProfileInfo}>
            <UserAvatar
            avatar={avatar}
            alt={name}
            isOnline={isUserOnline}
            className="!w-10"/> 
          </div>
          <div className="flex flex-col leading-5">
            <span className="text-black text-[15px] sm:text-base dark:text-white">{name}</span>
            {/*<span className="w-full text-[13px] text-primary">Typing....</span>*/}
            {isUserOnline ? (
              <span className="text-[12px] text-netral dark:text-slate-400">Online</span>
            ) : null}
          </div>
        </div>
        <div className="w-9 aspect-square rounded-full flexCenter bg-light dark:bg-dark-netral text-dark dark:text-white">
          <HiOutlineDotsHorizontal className="text-[20px]" />
        </div>
      </div>
    </div>
  )
}

export default ChatHeader

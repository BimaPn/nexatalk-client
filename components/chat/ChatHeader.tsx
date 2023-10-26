"use client"
import RoundedImage from "../ui/RoundedImage"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsTelephone } from "react-icons/bs"
import { HiOutlineVideoCamera } from "react-icons/hi2"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext,useEffect,useState } from "react"
import { UserAvatar } from "../ui/ChatItem"
import { chatSocket } from "../menu/ChatMenu"

const ChatHeader = ({userId,avatar,name,isOnline}:{userId:string,avatar:string,name:string,isOnline:boolean}) => {
  const { setIsOpen } = useContext(profileDetailContext) as ProfileDetail;
  const [isUserOnline,setIsUserOnline] = useState(isOnline);
  const openProfileInfo = (e:React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }
  useEffect(() => {
    chatSocket.on("onlineUser",(targetId,isOnline) => {
      if(targetId === userId) setIsUserOnline(isOnline);
    });
  },[]);
  return (
    <div className="w-full bg-white py-3">
      <div className="flex items-center justify-between px-5 border-l border-r">
        <div className="flex items-center gap-3">
          <div onClick={openProfileInfo}>
            <UserAvatar avatar={avatar} alt={name} isOnline={isUserOnline} /> 
          </div>
          <div className="flex flex-col leading-5">
            <span className="text-black">{name}</span>
            {/*<span className="w-full text-[13px] text-primary">Typing....</span>*/}
            {isUserOnline ? (
              <span className="text-[13px] text-netral">Online</span>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-6 text-netral">
          <BsTelephone className="text-[18px] stroke-[0.3px]" />
          <HiOutlineVideoCamera className="text-[23px]" />
          <HiOutlineDotsHorizontal className="text-[24px]" />
        </div>
      </div>
    </div>
  )
}

export default ChatHeader

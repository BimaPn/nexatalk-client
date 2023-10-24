"use client"
import RoundedImage from "../ui/RoundedImage"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsTelephone } from "react-icons/bs"
import { HiOutlineVideoCamera } from "react-icons/hi2"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"

const ChatHeader = ({avatar,name}:{avatar:string,name:string}) => {
  const { setIsOpen } = useContext(profileDetailContext) as ProfileDetail;
  const openProfileInfo = (e:React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }
  return (
    <div className="w-full bg-white py-3">
      <div className="flex items-center justify-between px-5 border-l border-r">
        <div className="flex items-center gap-3">
          <div onClick={openProfileInfo}>
            <RoundedImage src={avatar} alt={name} /> 
          </div>
          <div className="flex flex-col leading-5">
            <span className="text-black">{name}</span>
            {/*<span className="w-full text-[13px] text-primary">Typing....</span>*/}
            <span className="text-[13px] text-netral">Online</span>
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

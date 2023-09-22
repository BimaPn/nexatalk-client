"use client"
import RoundedImage from "../ui/RoundedImage"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { BsTelephone } from "react-icons/bs"
import { HiOutlineVideoCamera } from "react-icons/hi2"

const ChatHeader = ({onOpenProfile}:{onOpenProfile:(isOpen:boolean)=>void}) => {
  const openProfileInfo = (e:React.MouseEvent) => {
    e.preventDefault();
    onOpenProfile(true);
  }
  return (
    <div className="w-full bg-white py-3">
      <div className="flex items-center justify-between px-5 border-l border-r">
        <div className="flex items-center gap-3">
          <div onClick={openProfileInfo}>
            <RoundedImage src="/images/group/group.jpg" alt="group" /> 
          </div>
          <div className="flex flex-col leading-5">
            <span className="text-black">Weekend Wanderers</span>
            {/*<span className="w-full text-[13px] text-primary">Typing....</span>*/}
            <span className="text-[13px] text-netral">14 Members</span>
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

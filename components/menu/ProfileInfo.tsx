"use client"
import { IoMdClose } from "react-icons/io"
import RoundedImage from '@/components/ui/RoundedImage'
import { IoIosArrowForward } from "react-icons/io"
import bio from '@/data/dummies/groupMembers'
import Link from 'next/link'
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"
import { FaUserPlus, FaUserXmark } from "react-icons/fa6"
import AddFriendButton from "../ui/form/AddFriendButton"

const Navigation = ({ onClose }:{ onClose:()=>void }) => {
  const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    onClose();
  }
  return (
    <div className="grid grid-cols-3 py-2">
      <div>
        <button onClick={onClick} className="w-10 aspect-square flexCenter">
          <IoMdClose className="text-[23px]"/>
        </button> 
      </div>
      <span className="w-full block flexCenter font-medium">Profile Detail</span>
      <div></div>
    </div>
    )
}
const ProfileInfo = ({userTarget}:{userTarget:UserTarget}) => {
  const { isOpen,setIsOpen } = useContext(profileDetailContext) as ProfileDetail;

  return isOpen && (
    <section className="w-full bg-white dark:bg-dark-semiDark rounded-2xl lg:w-[512px] h-full overflow-auto custom-scrollbar px-2">
    <Navigation onClose={() => setIsOpen(false)} /> 
    <div className="flexCenter flex-col gap-3 mt-3 mb-4">
      <RoundedImage src={userTarget.avatar} className="!w-[40%]" alt={userTarget.name} />
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl text-black`">{userTarget.name}</span>
        <span className="text-gray-500 dark:text-slate-400 text-sm">{userTarget.username}</span>
      </div>

      <div className="flexCenter gap-3 mt-1">
        <AddFriendButton target={userTarget.id as string} className="flexCenter bg-light dark:bg-dark-netral rounded-[10px] gap-[10px] px-5 py-2">
          <FaUserPlus className="text-xl"/> 
          <span className="text-xs font-medium">Add</span>
        </AddFriendButton>

        <div className="flexCenter bg-light dark:bg-dark-netral rounded-[10px] gap-[10px] px-5 py-2">
          <FaUserXmark className="text-xl"/> 
          <span className="text-xs font-medium">Block</span>
        </div>
      </div>
    </div>

    <div className='text-center'>
      <p>{userTarget.bio}</p>
    </div>


    </section>
  )
}

export default ProfileInfo


    // <div className="flex flex-col bg-light gap-1 py-3 px-3 rounded-xl">
    //   <div className="flexBetween pb-2">
    //     <span className='whitespace-pre'>Media <span className='text-xs bg-rounded-lg px-[6px] py-[2px]'>112</span></span>
    //     <div className="px-1 aspect-square flexCenter rounded-xl bg-white"><IoIosArrowForward className="text-base"/></div>
    //   </div>
    //   <div className="flex items-center gap-2">
    //     {[1,2,3].map((image,index) => (
    //         <RoundedImage key={index} src={`/images/people/${image}.jpg`} alt='person' className="!rounded-xl basis-1/3" />
    //     ))}
    //   </div>
    // </div>

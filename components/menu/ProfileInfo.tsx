"use client"
import { IoMdClose } from "react-icons/io"
import RoundedImage from '@/components/ui/RoundedImage'
import { IoIosArrowForward } from "react-icons/io"
import bio from '@/data/dummies/groupMembers'
import Link from 'next/link'
import { PiMicrophoneFill } from "react-icons/pi"
import { IoExit } from "react-icons/io5"
import { FiUserPlus } from "react-icons/fi"
import { profileDetailContext } from "../providers/ProfileDetailProvider"
import { useContext } from "react"

const ProfileInfo = ({userTarget}:{userTarget:UserTarget}) => {
  const { isOpen,setIsOpen } = useContext(profileDetailContext) as ProfileDetail;
  const onCloseClick = (e:React.MouseEvent) => {
    setIsOpen(false);
  }
  return isOpen && (
    <section className="w-full bg-white rounded-xl shadow lg:w-[512px] h-full overflow-auto custom-scrollbar px-4">
    <div className="w-full flex items-center justify-between py-4 ">
      <span>User info</span>
      <button onClick={onCloseClick}>
        <IoMdClose className="text-[23px]"/>
      </button>
    </div>
    <div className="flexCenter flex-col gap-3 my-1 mb-4">
      <RoundedImage src={userTarget.avatar} className="!w-[40%]" alt={userTarget.name} />
      <span className="text-xl text-black`">{userTarget.name}</span>
      <div className='text-center text-semiDark text-sm'>
        {userTarget.bio && (
          <p>{userTarget.bio}</p>
        )}
      </div>
      <div className="flexCenter gap-3 mt-1">
        <div className="w-16 flexCenter flex-col aspect-square bg-light rounded-xl gap-[6px]">
          <PiMicrophoneFill className="text-[22px]"/> 
          <span className="text-xs font-medium">Mute</span>
        </div>
        <div className="w-16 flexCenter flex-col aspect-square bg-light rounded-xl gap-[6px]">
          <IoExit className="text-[23px]"/> 
          <span className="text-xs font-medium">Leave</span>
        </div>
      </div>
    </div>

    <div className="flex flex-col bg-light gap-1 py-3 px-3 rounded-xl">
      <div className="flexBetween pb-2">
        <span className='whitespace-pre'>Media <span className='text-xs bg-rounded-lg px-[6px] py-[2px]'>112</span></span>
        <div className="px-1 aspect-square flexCenter rounded-xl bg-white"><IoIosArrowForward className="text-base"/></div>
      </div>
      <div className="flex items-center gap-2">
        {[1,2,3].map((image,index) => (
            <RoundedImage key={index} src={`/images/people/${image}.jpg`} alt='person' className="!rounded-xl basis-1/3" />
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-1 py-1 my-2">
      <div className="flexBetween py-2">
        <span className='whitespace-pre'>14 Members</span>
      </div>
      <div className="flex items-center gap-2 text-primary mb-3">
        <FiUserPlus className="w-12 justify-center text-[23px]"/>
        <span className="font-medium text-sm">Add member</span>
      </div>
      <div className="flex flex-col gap-5">
        {bio.map((item,index) => (
          <div key={index} className="flex gap-3">
            <RoundedImage src={item.image} alt="person" />
            <div className="flex flex-col">
              <span>{item.name}</span>
              <span className="text-sm text-semiDark">{item.bio}</span>
            </div>
          </div>
        ))}
        <Link href={`/all`} className="font-medium text-sm text-primary text-center">View all</Link>
      </div>
    </div>
    </section>
  )
}

export default ProfileInfo

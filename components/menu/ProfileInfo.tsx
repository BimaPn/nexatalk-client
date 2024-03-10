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
import { FaUserLargeSlash } from "react-icons/fa6"

const ProfileInfo = ({userTarget}:{userTarget:UserTarget}) => {
  const { isOpen,setIsOpen } = useContext(profileDetailContext) as ProfileDetail;

  return isOpen && (
    <section className="w-full bg-white dark:bg-dark-semiDark rounded-2xl lg:w-[512px] h-full overflow-auto custom-scrollbar">
    <div className="aspect-[3/1] bg-dark-netral rounded-t-2xl rounded-b-lg relative mb-10 m-2">
      <button
      onClick={() => setIsOpen(false)} 
      className="w-8 aspect-square flexCenter bg-black/30 absolute top-2 right-2 rounded-full dark:hover:bg-black/40">
        <IoMdClose className="text-[19px]"/>
      </button> 
      <div className="absolute -bottom-8 left-2">
        <RoundedImage src={userTarget.avatar} className="!w-20 border-[6px] dark:border-dark-semiDark" alt={userTarget.name} />
      </div>
    </div>


    <div className="dark:bg-dark-dark px-4 pt-[10px] pb-3 rounded-xl mx-2">
      <div className="flexBetween border-b dark:border-slate-700 pb-3">
        <div className="w-[80%] flex flex-col">
          <span className="text-[17px] font-bold text-black`">{userTarget.name}</span>
          <span className="text-gray-500 dark:text-slate-400 text-xs">{userTarget.username}</span>
        </div>
        <AddFriendButton target={userTarget.id as string}/> 
      </div>

      <div className="flex flex-col gap-1 mt-3">
        <div className="flex flex-col gap-[2px]">
          <span className="text-gray-500 dark:text-slate-400 text-xs font-bold">Bio</span>
          <p className="text-sm">{userTarget.bio}</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 dark:text-slate-400 text-xs font-bold">Joined Since</span>
          <p className="text-sm">22 February 2024</p>
        </div>
      </div>
    </div>

    <div className='dark:bg-dark-dark flex flex-col gap-2 px-4 py-3 rounded-xl mt-3 mx-2'>
      <span className="text-gray-500 dark:text-slate-400 text-xs font-bold">Media</span>
      <div className="flex items-center gap-2">
        {['1','2','3'].map((item) => (
          <RoundedImage key={item} src={`/images/people/${item}.jpg`} alt={item} className="!w-1/4 !rounded-lg"/>
        ))}
        <button className="w-1/4 aspect-square flexCenter bg-black/20 rounded-lg dark:hover:bg-black/40">
          <IoIosArrowForward className="text-3xl" />
        </button> 
      </div>
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

import Dropdown from './Dropdown'
import RoundedImage from './RoundedImage'
import { IoLogOut } from 'react-icons/io5'
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5"
import { GoQuestion } from "react-icons/go"
import { useContext } from 'react'
import { MenuProvider, menuContext } from '../providers/MenuProvider'
import Link from 'next/link'
import LogoutButton from './form/LogoutButton'

const ChatMenuDropdown = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <Dropdown>
    <Dropdown.Trigger>
        <RoundedImage
        src="/images/people/2.jpg"
        alt="profile picture"
        className="!w-9"/>
    </Dropdown.Trigger>
    <Dropdown.Content className="left-0 w-56">
     <div className="bg-white flex flex-col shadow rounded-lg py-2 px-2 font-medium text-sm">

      <button
      onClick={() => changeMenu("settingsMenu")}
      className="flex items-center gap-3 py-[6px] px-1 hover:bg-light rounded-lg cursor-pointer">
        <div className="w-8 flexCenter aspect-square rounded-full">
          <IoSettingsOutline className="text-xl" />
        </div>
        Settings
      </button>

      <Link href={`/`} className="flex items-center gap-3 py-[6px] px-1 hover:bg-light rounded-lg cursor-pointer">
        <div className="w-8 flexCenter aspect-square rounded-full">
          <GoQuestion className="text-[21px]" />
        </div>
        About 
      </Link>

      <LogoutButton className="flex items-center gap-3 py-[6px] px-1 hover:bg-light rounded-lg">
        <div className="w-8 flex justify-end items-center aspect-square rounded-full">
          < IoLogOutOutline className="text-[23px] mr-[2px]" />
        </div>
        <span>
          Logout
        </span>
      </LogoutButton>
    </div> 
    </Dropdown.Content>
    </Dropdown>
  )
}

export default ChatMenuDropdown

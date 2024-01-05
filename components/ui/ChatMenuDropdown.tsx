import Dropdown from './Dropdown'
import RoundedImage from './RoundedImage'
import { IoLogOut } from 'react-icons/io5'
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5"
import { GoQuestion } from "react-icons/go"
import { useContext } from 'react'
import { MenuProvider, menuContext } from '../providers/MenuProvider'
import Link from 'next/link'
import LogoutButton from './form/LogoutButton'

const ChatMenuDropdown = ({avatar}:{avatar:string}) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  const itemClass = "flex items-center gap-3 py-[6px] px-1 hover:bg-light dark:hover:bg-dark-semiLight rounded-lg cursor-pointer"
  return (
    <Dropdown>
    <Dropdown.Trigger>
        <RoundedImage
        src={avatar}
        alt="profile picture"
        className="!w-[38px]"/>
    </Dropdown.Trigger>
    <Dropdown.Content className="right-0 w-56 text-black dark:text-white">
     <div className="bg-white dark:bg-dark-netral flex flex-col shadow rounded-lg py-2 px-2 font-medium text-sm">

      <button
      onClick={() => changeMenu("settingsMenu")}
      className={itemClass}>
        <div className="w-8 flexCenter aspect-square rounded-full">
          <IoSettingsOutline className="text-xl" />
        </div>
        Settings
      </button>
      <button
      onClick={() => changeMenu("storiesMenu")}
      className={itemClass}>
        <div className="w-8 flexCenter aspect-square rounded-full">
          <IoSettingsOutline className="text-xl" />
        </div>
        Stories
      </button>

      <Link href={`/`} className={itemClass}>
        <div className="w-8 flexCenter aspect-square rounded-full">
          <GoQuestion className="text-[21px]" />
        </div>
        About 
      </Link>

      <LogoutButton className={itemClass}>
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
const Item = ({children, onClick}:{children: React.ReactNode, onClick:() => void}) => {
  return (
    <button>

    </button>
  )
}

export default ChatMenuDropdown

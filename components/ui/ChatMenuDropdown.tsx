import Dropdown from './Dropdown'
import RoundedImage from './RoundedImage'
import { IoLogOut } from 'react-icons/io5'
import { IoIosSettings } from "react-icons/io"
import { GoQuestion } from "react-icons/go"
import { useContext } from 'react'
import { MenuProvider, menuContext } from '../providers/MenuProvider'
import LogoutButton from './form/LogoutButton'

const ChatMenuDropdown = ({avatar}:{avatar:string}) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  const itemClass = "flex items-center gap-3 py-[6px] px-1 hover:bg-light dark:hover:bg-dark-semiLight rounded-lg cursor-pointer group";
  const iconClass = "w-8 flexCenter bg-light group-hover:bg-white dark:bg-dark-semiLight dark:group-hover:bg-dark-netral aspect-square rounded-full";
  return (
    <Dropdown>
    <Dropdown.Trigger>
        <RoundedImage
        src={avatar}
        alt="profile picture"
        className="!w-[34px]"/>
    </Dropdown.Trigger>
    <Dropdown.Content className="right-0 w-52 text-black dark:text-white">
     <div className="bg-white dark:bg-dark-netral flex flex-col shadow rounded-lg py-2 px-2 font-medium text-sm">
      <button
      onClick={() => changeMenu("settingsMenu")}
      className={itemClass}>
        <div className={iconClass}>
          <IoIosSettings className="text-xl" />
        </div>
        Settings
      </button>
      <LogoutButton className={itemClass}>
        <div className={iconClass}>
          <IoLogOut className="text-[19px] -mr-[3px]" />
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

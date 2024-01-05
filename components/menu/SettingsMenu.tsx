import MenuLayout, {Navigation} from '@/layouts/MenuLayout'
import RoundedImage from '../ui/RoundedImage'
import { useContext } from 'react'
import { MenuProvider, menuContext } from '../providers/MenuProvider'
import { IoIosLock } from "react-icons/io"
import { RiPaintFill } from "react-icons/ri"
import LogoutButton from '../ui/form/LogoutButton'
import { IoLogOut } from "react-icons/io5"
import { RiUser3Fill } from "react-icons/ri"
import EditProfileModal from '../ui/EditProfileModal'

const SettingsMenu = ({userAuth}:SessionInfo) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout className="overflow-hidden">
      <Navigation title="Settings" onClose={() => changeMenu("chatsMenu")} />
      <Profile userAuth={userAuth}/>
      <Settings className="mt-4" />
    </MenuLayout>
  )
}

const Profile = ({userAuth}:SessionInfo) => {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <RoundedImage 
      src={userAuth.avatar}
      alt="profile picture" 
      className="!min-w-[46px]"
      />
      <div className="w-full flexBetween">
        <div className='flex flex-col gap-[2.5px] text-black dark:text-white'>
          <span>{userAuth.name}</span>
          <span className="text-xs text-gray-600 dark:text-dark-light">{userAuth.username}</span>
        </div>
        <EditProfileModal userAuth={userAuth} />
      </div>

    </div>
  )
}

const Settings = ({className}:{className?:string}) => {
  return (
    <div className={`w-full px-4 ${className}`}>
      <ul className="">
        <SettingItem 
        icon={<RiUser3Fill className="text-[19px]" />}
        label="Account"
        menu="accountMenu"
        onClick={(menu) => alert(menu)}
        />
        <SettingItem 
        icon={<IoIosLock className="text-[21px]" />}
        label="Privacy"
        menu="privacyMenu"
        onClick={(menu) => alert(menu)}
        />
        <SettingItem 
        icon={<RiPaintFill className="text-[20px]" />}
        label="Appearance"
        menu="appearanceMenu"
        onClick={(menu) => alert(menu)}
        />
        <li className="py-2 text-black dark:text-white group">
          <LogoutButton className="w-full flex items-center gap-[14px]">
            <div className="w-9 aspect-square flexCenter rounded-full bg-light dark:bg-dark-netral">
              <IoLogOut className="text-[20px] text-slate-600 dark:text-white group-hover:text-black dark:group-hover:text-dark-light -mr-[3px]" />
            </div>
            <div>
              <span className="text-[15px]">Logout</span>
            </div>
          </LogoutButton>
        </li>

      </ul>
    </div>
  )
}

const SettingItem = ({icon, label, menu, onClick, className}:{icon:React.ReactNode,label:string,menu:string,onClick:(menu:string) => void,className?:string}) => {
  const buttonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(menu);
  }
  return (
    <li className={`py-2 text-black dark:text-white ${className} group`}>
      <button onClick={buttonClick} className="w-full flex items-center gap-[14px]">
        <div className="w-[38px] aspect-square text-slate-600 dark:text-white group-hover:text-black dark:group-hover:text-dark-light flexCenter rounded-full bg-light dark:bg-dark-netral">
          {icon}
        </div> 
        <div>
          <span className="text-[15px]">{label}</span>
        </div>
      </button> 
    </li>
  )
}

export default SettingsMenu

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
import { IoIosArrowForward } from "react-icons/io" 

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
          <span className="text-xs text-gray-600 dark:text-slate-400">{userAuth.username}</span>
        </div>
        <EditProfileModal userAuth={userAuth} />
      </div>

    </div>
  )
}

const Settings = ({className}:{className?:string}) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <div className={`w-full px-4 ${className}`}>
      <ul className="flex flex-col gap-1 bg-light dark:bg-dark-dark px-2 py-2 rounded-xl">
        <SettingItem 
        icon={<RiUser3Fill className="text-[18px]" />}
        label="Account"
        menu="accountMenu"
        onClick={(menu) => alert(menu)}
        />
        <SettingItem 
        icon={<IoIosLock className="text-[20.5px] -mt-[2px]" />}
        label="Privacy"
        menu="privacyMenu"
        onClick={(menu) => alert(menu)}
        />
        <SettingItem 
        icon={<RiPaintFill className="text-[19px]" />}
        label="Appearance"
        menu="appearanceMenu"
        onClick={(menu) => changeMenu("appearanceMenu")}
        />
        <li className="flexBetween py-2 px-1 text-black hover:bg-semiLight dark:text-white dark:hover:bg-dark-semiDark rounded-xl group">
          <LogoutButton className="w-full flex items-center gap-[14px]">
            <div className="w-9 aspect-square flexCenter rounded-full bg-semiLight dark:bg-dark-netral dark:group-hover:bg-dark-netral group-hover:bg-light">
              <IoLogOut className="text-[19px] text-slate-600 dark:text-white -mr-[3px]" />
            </div>
            <div>
              <span className="text-[15px]">Logout</span>
            </div>
          </LogoutButton>
          <IoIosArrowForward />
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
    <li className={`flexBetween px-1 py-2 text-black dark:text-white hover:bg-semiLight dark:hover:bg-dark-semiDark rounded-xl ${className} group`}>
      <button onClick={buttonClick} className="w-full flex items-center gap-[14px]">
        <div 
        className="w-[36px] aspect-square text-slate-600 dark:text-white flexCenter rounded-full bg-semiLight dark:bg-dark-netral dark:group-hover:bg-dark-netral group-hover:bg-light">
          {icon}
        </div> 
        <div>
          <span className="text-[15px]">{label}</span>
        </div>
      </button> 
      <IoIosArrowForward />
    </li>
  )
}

export default SettingsMenu

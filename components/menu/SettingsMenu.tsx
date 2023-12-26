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
      className="!min-w-[48px]"
      />
      <div className="w-full flexBetween">
        <div className='flex flex-col gap-[2px]'>
          <span>{userAuth.name}</span>
          <span className="text-xs text-gray-600">{userAuth.username}</span>
        </div>
        <EditProfileModal userAuth={userAuth} />
      </div>

    </div>
  )
}

const Settings = ({className}:{className?:string}) => {
  return (
    <div className={`w-full px-4 ${className}`}>
      <ul className="bg-light rounded-xl px-2 py-2">
        <SettingItem 
        icon={<RiUser3Fill className="text-[20px]" />}
        label="Account"
        menu="accountMenu"
        onClick={(menu) => alert(menu)}
        />
        <SettingItem 
        icon={<IoIosLock className="text-[22px]" />}
        label="Privacy"
        menu="privacyMenu"
        onClick={(menu) => alert(menu)}
        />
        <SettingItem 
        icon={<RiPaintFill className="text-[21px]" />}
        label="Appearance"
        menu="appearanceMenu"
        onClick={(menu) => alert(menu)}
        />
        <li className="py-[6px] hover:bg-semiLight rounded-xl">
          <LogoutButton className="w-full flex items-center gap-2">
            <div className="w-10 aspect-square flexCenter">
              <IoLogOut className="text-[21px] -mr-[3px]" />
            </div>
            <div>
              <span>Logout</span>
            </div>
          </LogoutButton>
        </li>

      </ul>
    </div>
  )
}

const SettingItem = ({icon, label, menu, onClick}:{icon:React.ReactNode,label:string,menu:string,onClick:(menu:string) => void}) => {
  const buttonClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(menu);
  }
  return (
    <li className="py-[6px] hover:bg-semiLight rounded-xl">
      <button onClick={buttonClick} className="w-full flex items-center gap-2">
        <div className="w-10 aspect-square flexCenter">
          {icon}
        </div> 
        <div>
          <span>{label}</span>
        </div>
      </button> 
    </li>
  )
}

export default SettingsMenu

import Link from "next/link"
import { LuUsers } from "react-icons/lu"
import { PiChatCircleDots } from "react-icons/pi"
import { IoSettingsOutline } from "react-icons/io5"
import RoundedImage from "./RoundedImage"

const Navigation = () => {
  return (
  <nav className="fixed right-0 left-0 bottom-0 ss:top-0 w-full ss:w-16 bg-white ss:bg-light flex flex-col items-center justify-between py-2 ss:py-4 px-1 z-[999]">
   <div className="ss:block hidden">
   C
   </div> 
   <ul className="flex flex-row ss:flex-col items-center gap-3">
    <NavItem name={"Groups"} icon={<LuUsers className="text-[23px] stroke-[1.7px]" />}/>
    <NavItem name={"Chats"} icon={<PiChatCircleDots className="text-[25px]"  />} isActive={true}/>
    <NavItem name={"Settings"} icon={<IoSettingsOutline className="text-[24px]" />} />
   </ul>
   <div className="ss:block hidden">
    <RoundedImage src="/images/people/dodikurniawan.jpg" alt="person" className="!w-10" />
   </div>
  </nav>
  )
}

const NavItem = ({name,icon,isActive=false}:{icon:React.ReactNode,name:string,isActive?:boolean}) => {
  return (
  <li className={`${isActive ? "text-primary" : "text-netral"} flexCenter px-2 aspect-square rounded-full`}><Link href={'/chat'}>{icon}</Link></li>
  )
}

export default Navigation

import { HiOutlineArrowLeft } from "react-icons/hi"

const MenuLayout = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <aside className={`w-screen sm:w-[324px] md:w-[386px] bg-white dark:bg-dark-semiDark min-h-full rounded-none sm:rounded-2xl ${className} overflow-auto`}>
        {children}
    </aside>
  )
}

export const Navigation = ({children, title, onClose}:{children?:React.ReactNode, title: string, onClose:()=>void}) => {
  return (
    <div className="grid grid-cols-3 px-2 py-2 text-black dark:text-white">
      <div>
        <button onClick={onClose} className="w-10 aspect-square flexCenter">
          <HiOutlineArrowLeft className="text-[22px]" />
        </button> 
      </div>
      <span className="w-full block flexCenter font-medium">{title}</span>
      {children}
    </div>
  )
}

export default MenuLayout

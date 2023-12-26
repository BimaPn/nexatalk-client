import { HiOutlineArrowLeft } from "react-icons/hi"

const MenuLayout = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <aside className={`sm:min-w-[324px] md:min-w-[386px] bg-white min-h-full rounded-xl ${className} overflow-auto`}>
        {children}
    </aside>
  )
}

export const Navigation = ({title, onClose}:{title: string, onClose:()=>void}) => {
  return (
    <div className="grid grid-cols-3 px-2 py-2">
      <div>
        <button onClick={onClose} className="w-10 aspect-square flexCenter">
          <HiOutlineArrowLeft className="text-[22px]" />
        </button> 
      </div>
      <span className="w-full block flexCenter font-medium">{title}</span>
      <div></div>
    </div>
  )
}

export default MenuLayout

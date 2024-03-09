'use client'
import {useState,useContext,createContext, Dispatch, SetStateAction} from 'react'

type DropdownProvider = {
    open : boolean,
    setOpen : Dispatch<SetStateAction<boolean>>,
    toggleOpen : () => void 
}

export const dropDownContext = createContext<DropdownProvider | null>(null)

const Dropdown = ({children}:{children : React.ReactNode}) => {
    const [open,setOpen] = useState<boolean>(false);
    const toggleOpen = () => {
        setOpen((prev) => !prev)
    }
  return (
    <dropDownContext.Provider value={{ open,setOpen, toggleOpen}}>
        <div>
            {children}
        </div>
    </dropDownContext.Provider>
  )
}

const Trigger = ({children}:{children : React.ReactNode}) => {
    const { open,setOpen,toggleOpen } = useContext(dropDownContext) as DropdownProvider
    return (
        <>
            <div className="cursor-pointer" onClick={toggleOpen}>{children}</div>
            {open && <div className='fixed inset-0' onClick={() => setOpen(false)}></div>}
        </>
    )
}

const Content = ({children, showFromBottom=true, className}:{children : React.ReactNode, showFromBottom?:boolean, className ?: string}) => {
    const { open,setOpen } = useContext(dropDownContext) as DropdownProvider
    return open && (
        <div
        onClick={() => setOpen((prev:boolean) => !prev)}
        className={`absolute mt-2 ${showFromBottom && 'top-full'} ${className}`}>
            {children}
        </div>
    )
} 
Dropdown.Trigger = Trigger
Dropdown.Content = Content
export default Dropdown

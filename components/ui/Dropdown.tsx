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
        <div className='relative'>
            {children}
        </div>
    </dropDownContext.Provider>
  )
}

const Trigger = ({children}:{children : React.ReactNode}) => {
    const { open,setOpen,toggleOpen } = useContext(dropDownContext) as DropdownProvider
    return (
        <>
            <div onClick={toggleOpen}>{children}</div>
            {open && <div className='fixed inset-0 z-[990]' onClick={() => setOpen(false)}></div>}
        </>
    )
}

const Content = ({children,className}:{children : React.ReactNode,className ?: string}) => {
    const { open,setOpen } = useContext(dropDownContext) as DropdownProvider
    return open && (
        <div
        onClick={() => setOpen((prev:boolean) => !prev)}
        className={`absolute mt-2 top-full z-[994] ${className}`}>
            {children}
        </div>
    )
} 
Dropdown.Trigger = Trigger
Dropdown.Content = Content
export default Dropdown

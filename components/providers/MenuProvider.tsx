"use client"

import { createContext, useState } from "react"

export type MenuProvider = {
  currentMenu: string,
  changeMenu: (menu:string) => void
}
export const menuContext = createContext<MenuProvider | null>(null);

const MenuProvider = ({children}:{children:React.ReactNode}) => {
  const [currentMenu, setCurrentMenu] = useState<string>("chatMenu");
  
  const changeMenu = (menu:string) => {
    setCurrentMenu(menu);
  }
  return (
    <menuContext.Provider value={{currentMenu, changeMenu}}>
    {children}
    </menuContext.Provider>
  )
}

export default MenuProvider

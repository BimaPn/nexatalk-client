"use client"
import { createContext,useState } from "react"

export const profileDetailContext = createContext<ProfileDetail | null>(null);

const ProfileDetailProvider = ({children}:{children:React.ReactNode}) => {
  const [isOpen,setIsOpen] = useState<boolean>(true);
  return (
  <profileDetailContext.Provider value={{isOpen,setIsOpen}}>
  {children}
  </profileDetailContext.Provider>
  )
}

export default ProfileDetailProvider

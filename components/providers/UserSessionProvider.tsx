"use client"
import { createContext, useState } from "react"

export type UserSession = {
  user: AuthUser,
  updateSession: (data: AuthUser) => void
}
export const userSessionContext = createContext<UserSession | null>(null);

const UserSessionProvider = ({children,defaultSession}:{children:React.ReactNode, defaultSession:AuthUser}) => {
  const [user, setUser] = useState<AuthUser>(defaultSession);

  const updateSession = (data: AuthUser) => {
    setUser(data);
  }
  return (
    <userSessionContext.Provider value={{ user, updateSession }}>
      {children}
    </userSessionContext.Provider>
  )
}

export default UserSessionProvider

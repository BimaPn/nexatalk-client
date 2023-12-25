"use client"
import { Dispatch, SetStateAction, createContext, useState } from "react"

export type statusType = "0"|"1"|"2"|"3";
export type FriendStatus = {
  status: statusType,
  setStatus: Dispatch<SetStateAction<statusType>>
}
export const friendStatusContext = createContext<FriendStatus|null>(null);

const FriendStatusProvider = ({children}:{children:React.ReactNode}) => {
  const [ status, setStatus ] = useState<statusType>("0");
  return (
    <friendStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </friendStatusContext.Provider>
  )
}

export default FriendStatusProvider

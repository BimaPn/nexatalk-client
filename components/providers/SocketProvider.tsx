"use client"
import { socketInit } from '@/app/api/socket/socket';
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { Socket } from 'socket.io-client';

export type SocketProvider = {
  socket: Socket,
  isConnected: boolean,
  setIsConnected: Dispatch<SetStateAction<boolean>>
}
export const socketContext = createContext<SocketProvider | null>(null);

const SocketProvider = ({ children, accessToken }:{ children:React.ReactNode, accessToken:string}) => {
  const socket = socketInit("/chat", accessToken);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  
  return (
    <socketContext.Provider value={{ socket, isConnected, setIsConnected }}>
    {children}
    </socketContext.Provider>
  )
}

export default SocketProvider

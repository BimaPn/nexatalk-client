"use client"
import socketInit from '@/app/api/socket/socket';
import React, { createContext } from 'react'
import { Socket } from 'socket.io-client';

export type SocketProvider = {
  getSocket : (url:string,accessToken:string) => Socket,
}
export const socketContext = createContext<SocketProvider | null>(null);

let chatSocket:Socket;

const SocketProvider = ({children}:{children:React.ReactNode}) => {

  const getSocket = (url:string,accessToken:string):Socket => {
    chatSocket = socketInit(url,accessToken);
    return chatSocket;
  }
  return (
    <socketContext.Provider value={{getSocket}}>
    {children}
    </socketContext.Provider>
  )
}

export default SocketProvider

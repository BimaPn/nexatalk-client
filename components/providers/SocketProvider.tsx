"use client"
import { socketInit } from '@/app/api/socket/socket';
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client';

export type SocketProvider = {
  chatSocket: Socket,
  storiesSocket: Socket,
}
export const socketContext = createContext<SocketProvider | null>(null);

const SocketProvider = ({ children, accessToken }:{ children:React.ReactNode, accessToken:string}) => {
  const chatSocket = socketInit("/chat", accessToken);
  const storiesSocket = socketInit("/stories",accessToken); 

  return (
    <socketContext.Provider value={{ chatSocket, storiesSocket }}>
    {children}
    </socketContext.Provider>
  )
}

export default SocketProvider

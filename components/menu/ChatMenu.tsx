"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import { Socket } from 'socket.io-client'
import Search from '../ui/Search'
import ChatItem from "../ui/ChatItem"
import { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import { chatListContext } from '../providers/ChatListProvider'
import RoundedImage from '../ui/RoundedImage'
import { PiPlusCircle } from "react-icons/pi"
import { TbDotsVertical } from "react-icons/tb"
import { SocketProvider, socketContext } from '../providers/SocketProvider'
import ChatMenuDropdown from '../ui/ChatMenuDropdown'

const ChatMenu = ({accessToken, avatar, className}:{accessToken:string, avatar:string, className ?: string}) => {
  const { socket, isConnected, setIsConnected } = useContext(socketContext) as SocketProvider;
  const pathname = usePathname();
  const { chats,addChatToList,setOnlineUser } = useContext(chatListContext) as ChatList;
  
  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  },[]);

  useEffect(() => {
    if(!isConnected) return;
    const receiveMessage = ({message,from}:{message:string,from:ChatItem}) => {
      addChatToList(from);
    };
    const checkOnline = (username:string, isOnline:boolean) => {
      setOnlineUser(username, isOnline);
    };

    socket.on("message", receiveMessage);    
    socket.on("onlineUser", checkOnline);

    return () => {
      socket.off("message", receiveMessage);
      socket.off("onlineUser", checkOnline);
    }
  },[isConnected]);

  return (  
    <MenuLayout className={`pt-3 pb-5 relative px-2 ${pathname !== "/chat" && "hidden sm:block"}`}>
        <MenuNavbar avatar={avatar} className="sticky top-0 z-[1400] mb-3 mx-1"/> 
        < Search />
        <ul className="flex flex-col gap-1 mt-5">
        {chats.map((chat:ChatItem) => (
          <Link key={chat.username} href={`/chat/${chat.username}`}>
            <ChatItem name={chat.name} avatar={chat.avatar} createdAt={chat.createdAt} message={chat.message} unread={chat.unread} isOnline={chat.isOnline} />
          </Link>
        ))}
        </ul>
    </MenuLayout>
  )
}

const MenuNavbar = ({avatar, className}:{avatar:string, className?:string}) => {
  return (
    <div className={`flexBetween py-2 px-2 ${className}`}>
      <h1 className="font-bold text-[25px] text-primary">MiChat</h1>
      <ChatMenuDropdown avatar={avatar} /> 
    </div>
  )
}


export default ChatMenu;  

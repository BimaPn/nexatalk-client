"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import Search from '../ui/Search'
import ChatItem from "../ui/ChatItem"
import { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import { chatListContext } from '../providers/ChatListProvider'
import { SocketProvider, socketContext } from '../providers/SocketProvider'
import ChatMenuDropdown from '../ui/ChatMenuDropdown'
import { AiOutlineWechat } from "react-icons/ai"
import { Socket } from 'socket.io-client'
import ApiClient from '@/app/api/axios/ApiClient'
import ChatMenuSkeleton from '../skeletons/ChatMenuSkeleton'
import { BiSolidMessageDetail } from "react-icons/bi"

const ChatsMenu = ({accessToken, avatar, className}:{accessToken:string, avatar:string, className ?: string}) => {
  const { socket, isConnected } = useContext(socketContext) as SocketProvider;
  const pathname = usePathname();
  const { chatlists, setChatlists, isLoaded, setIsLoaded, addChatToList, setOnlineUser } = useContext(chatListContext) as ChatList;

  useEffect(() => {
    if(isLoaded) return;
    ApiClient.get(`chat/list`)
    .then((res) => {
      setChatlists(res.data.users);
      setIsLoaded(true);
    })
    .catch((err) => {
      throw new Error("Something goes wrong...");
      setIsLoaded(true);
    });
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
      <Search />
        {isLoaded ? (
          <ul className="flex flex-col gap-1 mt-4">
          {chatlists.map((chat:ChatItem) => (
            <Link key={chat.username} href={`/chat/${chat.username}`}>
              <ChatItem 
              name={chat.name}
              avatar={chat.avatar}
              createdAt={chat.createdAt}
              message={chat.message}
              unread={chat.unread}
              isOnline={chat.isOnline} />
            </Link>
          ))}
          </ul>
        ):(
          <ChatMenuSkeleton />
        )}
        <div className="absolute bottom-4 right-4 w-[46px] aspect-square flexCenter bg-primary rounded-full shadow">
          <BiSolidMessageDetail className="text-[23px] text-white" />
        </div>
    </MenuLayout>
  )
}

const MenuNavbar = ({avatar, className}:{avatar:string, className?:string}) => {
  return (
    <div className={`flexBetween py-1 px-2 ${className}`}>
      <div className="flexCenter gap-[5px] text-black dark:text-white">
        <AiOutlineWechat className="text-3xl" />
        <h1 className="font-bold text-[22px]">MiChat</h1>
      </div>
      <ChatMenuDropdown avatar={avatar} /> 
    </div>
  )
}


export default ChatsMenu;  

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

const ChatMenu = ({accessToken, avatar, className}:{accessToken:string, avatar:string, className ?: string}) => {
  const { socket, isConnected } = useContext(socketContext) as SocketProvider;
  const pathname = usePathname();
  const { chatlists, setChatlists, addChatToList, setOnlineUser } = useContext(chatListContext) as ChatList;
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    ApiClient.post(`chat/list`)
    .then((res) => {
      setChatlists(res.data.users);
      setIsLoading(false);
    })
    .catch((err) => {
      throw new Error("Something goes wrong...");
      setIsLoading(false);
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
        {!isLoading ? (
          <ul className="flex flex-col gap-1 mt-5">
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
    </MenuLayout>
  )
}

const MenuNavbar = ({avatar, className}:{avatar:string, className?:string}) => {
  return (
    <div className={`flexBetween py-2 px-2 ${className}`}>
      <div className="flexCenter gap-[5px] text-dark">
        <AiOutlineWechat className="text-3xl" />
        <h1 className="font-bold text-[22px]">MiChat</h1>
      </div>
      <ChatMenuDropdown avatar={avatar} /> 
    </div>
  )
}


export default ChatMenu;  

"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import { Socket } from 'socket.io-client'
import Search from '../ui/Search'
import ChatItem from "../ui/ChatItem"
import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { chatListContext } from '../providers/ChatListProvider'
import RoundedImage from '../ui/RoundedImage'
import { PiPlusCircle } from "react-icons/pi"
import { TbDotsVertical } from "react-icons/tb"
import { SocketProvider, socketContext } from '../providers/SocketProvider'
import { MenuProvider, menuContext } from '../providers/MenuProvider'
import ChatMenuDropdown from '../ui/ChatMenuDropdown'

let chatSocket:Socket;

const ChatMenu = ({accessToken,className}:{accessToken:string,className ?: string}) => {
  const { getSocket } = useContext(socketContext) as SocketProvider;
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  const pathname = usePathname();
  const { chats,addChatToList,setOnlineUser } = useContext(chatListContext) as ChatList;

  useEffect(() => {
    chatSocket = getSocket("/chat",accessToken);
    chatSocket.on("message",({message,from}:{message:string,from:ChatItem}) => {
      addChatToList(from);
    });
    chatSocket.on("onlineUser",(userId,isOnline) => {
      setOnlineUser(userId,isOnline);
    });
    return () => {
      chatSocket.disconnect();
    }
  },[]);
  return (  
    <MenuLayout className={`pt-3 pb-5 relative px-2 ${pathname !== "/chat" && "hidden sm:block"}`}>
        <MenuNavbar className="sticky top-0 z-[1400] mb-5 mx-1"/> 
        < Search />
        <button onClick={() => changeMenu("settingsMenu")}>go to settings</button>
        <ul className="flex flex-col gap-1 mt-4">
        {chats.map((chat:ChatItem) => (
          <Link key={chat.username} href={`/chat/${chat.username}`}>
            <ChatItem name={chat.name} avatar={chat.avatar} createdAt={chat.createdAt} message={chat.message} unread={chat.unread} isOnline={chat.isOnline} />
          </Link>
        ))}
        </ul>

    </MenuLayout>
  )
}

const MenuNavbar = ({className}:{className?:string}) => {
  return (
    <div className={`flexBetween py-2 px-2 bg-light rounded-xl ${className}`}>
      <ChatMenuDropdown /> 
      <div className="flexCenter gap-3">
            <PiPlusCircle className="text-[25px] text-dark"/>
            <TbDotsVertical className="text-[19px] text-dark"/>
      </div>
    </div>
  )
}


export default ChatMenu;  

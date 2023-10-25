"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import socketInit from '@/app/api/socket/socket'
import { Socket } from 'socket.io-client'
import Search from '../ui/Search'
import people from '@/data/dummies/peoplechat'
import ChatItem from "../ui/ChatItem"
import { useEffect, useContext } from 'react'
import Link from 'next/link'
import { chatListContext } from '../providers/ChatListProvider'

export let chatSocket:Socket;

const ChatMenu = ({accessToken,className}:{accessToken:string,className ?: string}) => {
  const pathname = usePathname();
  const { chats,addChatToList,setOnlineUser } = useContext(chatListContext) as ChatList;
  useEffect(() => {
    chatSocket = socketInit("/chat",accessToken);
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
    <MenuLayout className={`w-full sm:w-fit ${pathname !== "/chat" && "hidden sm:block"}`}>
        < Search />
        <ul className="flex flex-col gap-1 mt-4">
        {chats.map((chat:ChatItem) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <ChatItem name={chat.name} avatar={chat.avatar} createdAt={chat.createdAt} message={chat.message} unread={chat.unread} isOnline={chat.isOnline} />
          </Link>
        ))}
        </ul>
    </MenuLayout>
  )
}

export default ChatMenu;  

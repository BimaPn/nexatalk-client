"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import socketInit from '@/app/api/socket/socket'
import { Socket } from 'socket.io-client'
import Search from '../ui/Search'
import people from '@/data/dummies/peoplechat'
import ChatItem from "../ui/ChatItem"
import { useState,useEffect, useContext } from 'react'
import Link from 'next/link'
import { chatListContext } from '../providers/ChatListProvider'

const ChatMenu = ({accessToken,className}:{accessToken:string,className ?: string}) => {
  const pathname = usePathname();
  const { chats } = useContext(chatListContext) as ChatList;
  return (  
    <MenuLayout className={`w-full sm:w-fit ${pathname !== "/chat" && "hidden sm:block"}`}>
        < Search />
        <ul className="flex flex-col gap-1 mt-4">
        {chats.map((chat:ChatItem) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <ChatItem name={chat.name} image={chat.image} time={chat.time} message={chat.message} />
          </Link>
        ))}
        </ul>
    </MenuLayout>
  )
}

export default ChatMenu;  

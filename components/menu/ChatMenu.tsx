"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import React from 'react'
import Search from '../ui/Search'
import people from '@/data/dummies/peoplechat'
import ChatItem from "../ui/ChatItem"
const ChatMenu = ({className}:{className ?: string}) => {
  const pathname = usePathname();
  return (  
    <MenuLayout className={`w-full sm:w-fit ${pathname !== "/chat" && "hidden sm:block"}`}>
        < Search />
        <ul className="flex flex-col gap-1 mt-4">
        {people.map((person,index) => (
          <ChatItem key={index} name={person.name} imageSrc={person.image} time={person.time} messege={person.messege} />
        ))}
        {people.map((person,index) => (
          <ChatItem key={index} name={person.name} imageSrc={person.image} time={person.time} messege={person.messege} />
        ))}
        {people.map((person,index) => (
          <ChatItem key={index} name={person.name} imageSrc={person.image} time={person.time} messege={person.messege} />
        ))}
        {people.map((person,index) => (
          <ChatItem key={index} name={person.name} imageSrc={person.image} time={person.time} messege={person.messege} />
        ))}
        {people.map((person,index) => (
          <ChatItem key={index} name={person.name} imageSrc={person.image} time={person.time} messege={person.messege} />
        ))}
        </ul>
    </MenuLayout>
  )
}

export default ChatMenu;  

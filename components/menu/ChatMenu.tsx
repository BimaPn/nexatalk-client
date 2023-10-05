"use client"
import MenuLayout from '@/layouts/MenuLayout'
import { usePathname } from "next/navigation"
import socketInit from '@/app/api/socket/socket'
import { Socket } from 'socket.io-client'
import Search from '../ui/Search'
import people from '@/data/dummies/peoplechat'
import ChatItem from "../ui/ChatItem"
import { useState,useEffect } from 'react'
import Link from 'next/link'

let socket:Socket;

const ChatMenu = ({accessToken,className}:{accessToken:string,className ?: string}) => {
  const pathname = usePathname();
  const [rooms,setRooms] = useState([]);
  useEffect(() => {
    socket = socketInit("/room",accessToken);
    socket.on("rooms",(users) => setRooms(users));

    return () => {
      socket.disconnect();
    }
  },[]);

  return (  
    <MenuLayout className={`w-full sm:w-fit ${pathname !== "/chat" && "hidden sm:block"}`}>
        < Search />
        <ul className="flex flex-col gap-1 mt-4">
        {people.map((person,index) => (
          <Link href={"/chat/1212"} key={index} >

          <ChatItem name={person.name} imageSrc={person.image} time={person.time} messege={person.messege} />
          </Link>

        ))}
        {rooms.map((person:any,index) => (
          <Link key={index} href={`/chat/${person._id}`}>
            <ChatItem name={person.name} imageSrc={"/images/people/1.jpg"} time={"haha"} messege={"baby"} />
          </Link>
        ))}
        </ul>
    </MenuLayout>
  )
}

export default ChatMenu;  

"use client"
import MainLayout from '@/layouts/MainLayout'
import Image from 'next/image'
import { Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import {useEffect, useState} from "react"

let socket:Socket;

export default function Home() {
const { data:session,status } = useSession();
  const [username,setUsername] = useState<string>("");

  return (
    <>
    <h1>Halo ${session?.user.username}</h1>
    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your username" />
    <button type='submit'>Submit</button>
    </>
  )
}

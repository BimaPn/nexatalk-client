"use client"

import ApiClient from "@/app/api/axios/ApiClient";
import { SocketProvider, socketContext } from "@/components/providers/SocketProvider"
import { useContext, useEffect } from "react"

const AddFriendButton = ({ children, target, className }:{ children:React.ReactNode, target:string, className?:string }) => {
  const { socket } = useContext(socketContext) as SocketProvider;

  const sendRequest = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // await ApiClient.post(`users/${target}/friend-request`)
    // .then((res) => {
      socket.emit("friendRequest",target);
    // })
    // .catch((err) => {
    //   console.error(err.response);
    // });
  }
  return (
    <button onClick={sendRequest} className={`${className}`}>
      { children }
    </button>
  )
}

export default AddFriendButton

"use client"
import ApiClient from "@/app/api/axios/ApiClient";
import { FriendStatus, friendStatusContext } from "@/components/providers/FriendStatusProvider";
import { SocketProvider, socketContext } from "@/components/providers/SocketProvider"
import { useContext, useEffect } from "react"

const AddFriendButton = ({ children, target, className }:{ children:React.ReactNode, target:string, className?:string }) => {
  const { socket } = useContext(socketContext) as SocketProvider;
  const { status, setStatus } = useContext(friendStatusContext) as FriendStatus;
  const sendRequest = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(status == "0") {
      await ApiClient.post(`users/${target}/friend-request`)
        .then((res) => {
          socket.emit("friendRequest",target,"2");
          setStatus("1");
      });
    }
    else if(status == "2") {
      await ApiClient.put(`users/${target}/friend-request`)
        .then((res) => {
          socket.emit("friendRequest",target,"3");
          setStatus("3");
      });
    }
    else if(status == "1" || status == "3") {
      await ApiClient.delete(`users/${target}/friend-request`)
        .then((res) => {
          socket.emit("friendRequest",target,"0");
          setStatus("0");
      });
    }
  }
  return (
    <button onClick={sendRequest} className={`${className}`}>
      {status == "0" && "Add"}
      {status == "1" && "Wait"}
      {status == "2" && "Confirm"}
      {status == "3" && "Delete"}
    </button>
  )
}

export default AddFriendButton

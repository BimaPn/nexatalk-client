"use client"
import ApiClient from "@/app/api/axios/ApiClient";
import { FriendStatus, friendStatusContext } from "@/components/providers/FriendStatusProvider";
import { SocketProvider, socketContext } from "@/components/providers/SocketProvider"
import { useContext, useEffect } from "react"
import { FaUserPlus, FaUserClock, FaUserCheck, FaUserXmark } from "react-icons/fa6"

const AddFriendButton = ({ target, className }:{ target:string, className?:string }) => {
  const { chatSocket } = useContext(socketContext) as SocketProvider;
  const { status, setStatus } = useContext(friendStatusContext) as FriendStatus;
  const sendRequest = async (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!chatSocket) return
    e.preventDefault();
    if(status == "0") {
      await ApiClient.post(`users/${target}/friend-request`)
        .then((res) => {
          chatSocket.emit("friendRequest",target,"2");
          setStatus("1");
      });
    }
    else if(status == "2") {
      await ApiClient.put(`users/${target}/friend-request`)
        .then((res) => {
          chatSocket.emit("friendRequest",target,"3");
          setStatus("3");
      });
    }
    else if(status == "1" || status == "3") {
      await ApiClient.delete(`users/${target}/friend-request`)
        .then((res) => {
          chatSocket.emit("friendRequest",target,"0");
          setStatus("0");
      });
    }
  }
  return (
    <button 
    onClick={sendRequest}
    className={`px-3 aspect-square flexCenter rounded-xl dark:hover:bg-dark-semiDark ${className}`}>
      {status == "0" && <FaUserPlus className="text-xl"/>}
      {status == "1" && <FaUserClock className="text-xl"/>}
      {status == "2" && <FaUserCheck className="text-xl"/>}
      {status == "3" && <FaUserXmark className="text-xl"/>}
    </button>
  )
}

export default AddFriendButton

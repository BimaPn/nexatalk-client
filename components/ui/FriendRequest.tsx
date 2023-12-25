"use client"
import { useContext, useEffect } from "react"
import { Socket } from "socket.io-client";
import { FriendStatus, friendStatusContext, statusType } from "../providers/FriendStatusProvider";
import ApiClient from "@/app/api/axios/ApiClient";

const FriendRequest = ({ socket, target }:{ socket:Socket, target:string }) => {
  const { status, setStatus } = useContext(friendStatusContext) as FriendStatus;

  useEffect(()=> {
    ApiClient.get(`users/${target}/friend-request`)
    .then((res) => {
      setStatus(res.data.status);
    })
    .catch((err) => {
      console.error(err.response);
    });
    const receiveRequest = (from:string, statusResponse:statusType) => {
      if(from === target) {
        setStatus(statusResponse);
      }
    }
    socket.on("friendRequest",receiveRequest);
    return () => {
      socket.off("friendRequest",receiveRequest);
    }
  },[]);
  const acceptRequest = async (e:React.MouseEvent<HTMLButtonElement>) => {
    await ApiClient.put(`users/${target}/friend-request`)
      .then((res) => {
        socket.emit("friendRequest",target,"3");
        setStatus("3");
    });
  }
  const declineRequest = async (e:React.MouseEvent<HTMLButtonElement>) => {
    await ApiClient.delete(`users/${target}/friend-request`)
      .then((res) => {
        socket.emit("friendRequest",target,"0");
        setStatus("0");
    });
  }
  return status == "2" && (
    <div className="absolute top-0 right-0 left-0 px-4 py-4 z-[1001]">
      <div className="w-full bg-white/50 flexBetween rounded-xl backdrop-blur px-5 py-4">
        <span>👋 Hi there ! 🌟 Ready to be friend ?</span>
        <div className="flexCenter gap-[13px]">
          <button onClick={acceptRequest} className="px-4 py-[6px] bg-dark text-white text-[15px] font-medium rounded-[10px]">confirm</button>
          <button onClick={declineRequest} className="px-4 py-[6px] bg-netral/20 text-[15px] font-medium rounded-[10px]">reject</button>
        </div>
      </div>
    </div>
  )
}

export default FriendRequest;

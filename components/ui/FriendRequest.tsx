"use client"
import { useContext, useEffect, useState } from "react"
import { SocketProvider, socketContext } from "../providers/SocketProvider";

export const FriendRequest = ({ visible, target }:{ visible: boolean, target:string }) => {
  const { socket } = useContext(socketContext) as SocketProvider;
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  useEffect(()=> {
      
    const receiveRequest = ({ status,from }:{status:boolean, from:string}) => {
      if(from === target) {
        setIsVisible(status);
      }
    }
    socket.on("friendRequest",receiveRequest);

    return () => {
      socket.off("friendRequest",receiveRequest);
    }
  },[]);

  const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    setIsVisible(false);
  }

  return isVisible && (
    <div className="absolute top-0 right-0 left-0 px-4 py-4 z-[1001]">
      <div className="w-full bg-white/50 flexBetween rounded-xl backdrop-blur px-5 py-4">
        <span>👋 Hi there ! 🌟 Ready to be friend ?</span>
        <div className="flexCenter gap-[13px]">
          <button onClick={onClick} className="px-4 py-[6px] bg-dark text-white text-[15px] font-medium rounded-[10px]">Accept</button>
          <button onClick={onClick} className="px-4 py-[6px] bg-netral/20 text-[15px] font-medium rounded-[10px]">Decline</button>
        </div>
      </div>
    </div>
  )
}

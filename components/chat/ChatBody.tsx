"use client"
import UserMessage from "../ui/message/UserMessage"
import ChatInput from "./ChatInput"
import { useState,useRef, useEffect, useContext } from "react"
import { chatListContext } from "../providers/ChatListProvider"
import { Socket } from "socket.io-client"
import MediaMessage from "../ui/message/MediaMessage"

type ChatBodyT = {
  accessToken:string,
  userTarget:UserTarget,
  defaultMessages?:UserMessage[],
  isOnline:boolean,
  socket:Socket
}

const ChatBody = ({accessToken,userTarget,defaultMessages=[],isOnline,socket}:ChatBodyT) => { 
  const chatBody = useRef<HTMLDivElement | null>(null);
  const [messages,setMessages] = useState<(UserMessage|ImagesMessage)[]>(defaultMessages);
  const { chats, addChatToList,clearUnreadCount } = useContext(chatListContext) as ChatList

  useEffect(() => {    
    const receiveMessage = ({content,from}:{content:{message?:string,images?:string[]},from:ChatItem}) => {
      if(from.username !== userTarget.username) return;
      const userMessage = {
       ...content,
       isCurrentUser:false,
       createdAt:from.createdAt
      } 
      setMessages(prev => [...prev,userMessage as any]);
      socket.emit("messagesRead",userTarget.username);
      clearUnreadCount(userTarget.username);
    }  
    socket.on("message", receiveMessage);
    socket.emit("messagesRead",userTarget.username);
    clearUnreadCount(userTarget.username);

    return () => {
      socket.off("message", receiveMessage);
    }
  },[]);

  useEffect(() => {
    chatBody!.current!.scrollTop = chatBody!.current!.scrollHeight;
  },[messages]);

  const sendMessage = (msg:UserMessage|ImagesMessage) => {
    socket.emit("message",{message:msg,to:userTarget.username});
    if(!("message" in msg)) {
      const images = msg.images as File[];
      msg.images = images.map((file:File) => URL.createObjectURL(file));
    }

    setMessages(prev => [...prev,msg]);

    let newChat:ChatItem = {
      username:userTarget.username,
      avatar:userTarget.avatar,
      name:userTarget.name,
      createdAt:msg.createdAt,
      message:"message" in msg ? msg.message : "images",
      isOnline:false,
    }    
      
    addChatToList(newChat); 
  }
  return (
    <div ref={chatBody} className="h-full bg-light flex flex-col overflow-hidden rounded-xl m-0 sm:mx-3 relative">


      <div className="absolute top-0 right-0 left-0 px-4 py-4">
        <div className="w-full bg-white/50 flexBetween rounded-xl backdrop-blur px-5 py-4">
          <span>👋 Hi there ! 🌟 Ready to be friend ?</span>
          <div className="flexCenter gap-[13px]">
            <button className="px-4 py-[6px] bg-dark text-white text-[15px] font-medium rounded-[10px]">Accept</button>
            <button className="px-4 py-[6px] bg-netral/20 text-[15px] font-medium rounded-[10px]">Decline</button>
          </div>
        </div>
      </div>


      <ul className="w-full h-full overflow-y-auto flex flex-col gap-4 px-3 pt-4 custom-scrollbar scroll-smooth">
        <div className="w-full flexCenter">
          <span className="bg-white text-sm px-4 py-1 rounded-full">Today</span>
        </div>
        {messages.map((msg,index) => {
          return "message" in msg ? (
            <li key={index} className={`w-full flex ${msg.isCurrentUser ? "justify-end":"justify-start"}`}>
              < UserMessage
              message={msg.message}
              createdAt={msg.createdAt}
              isCurrentUser={msg.isCurrentUser}/>
            </li>
          ) : 
            <li key={index}>
              <MediaMessage
              media={msg.images as string[]} 
              createdAt={msg.createdAt} 
              isCurrentUser={msg.isCurrentUser} />
            </li>
        })}
            <li>
             <MediaMessage
             media={["http://localhost:3500/videos/example.mp4"]}
             createdAt="12.00 PM"
             isCurrentUser
             />
            </li>
      </ul>
      <div className="w-full">
          <ChatInput setMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatBody

"use client"
import ChatInput from "./ChatInput"
import { useState, useEffect, useContext } from "react"
import { chatListContext } from "../providers/ChatListProvider"
import { Socket } from "socket.io-client"
import FriendRequest from "../ui/FriendRequest"
import { messageContext } from "../providers/MessageProvider"
import MessageContent from "./MessageContent"

type ChatBodyT = {
  accessToken:string,
  userTarget:UserTarget,
  defaultMessages?:UserMessage[],
  isOnline:boolean,
  socket:Socket
}

const ChatBody = ({accessToken,userTarget,isOnline,socket}:ChatBodyT) => { 

  const { messages, addMessage, addMessages, deleteMessage } = useContext(messageContext);
  const { chatlists, addChatToList,clearUnreadCount } = useContext(chatListContext) as ChatList
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {    
    const receiveMessage = ({content,from}:{content:{message?:string,images?:string[]},from:ChatItem}) => {
      if(from.username !== userTarget.username) return;
      const userMessage = {
       ...content,
       isCurrentUser:false,
       createdAt:from.createdAt
      } 
      addMessage(userMessage as any);
      socket.emit("messagesRead",userTarget.id);
      clearUnreadCount(userTarget.username);
    }  

    const typingListening = (from: string, isTyping:boolean) => {
      setIsTyping(isTyping);
    }

    const deletedMessage = (messageId:string) => {
       deleteMessage(messageId) 
    }

    socket.on("message", receiveMessage);
    socket.on("deletedMessage",deletedMessage);
    socket.emit("messagesRead",userTarget.id);
    socket.on("typing",typingListening);
    clearUnreadCount(userTarget.username);

    return () => {
      socket.off("message", receiveMessage);
      socket.off("deletedMessage",deletedMessage);
      socket.off("typing", typingListening);
    }
  },[]);
  
  const sendMessage = (message:UserMessage|MediaMessage) => {
    socket.emit("message",{message,to:userTarget.id});
    addMessage(message);

    let newChat:ChatItem = {
      username:userTarget.username,
      avatar:userTarget.avatar,
      name:userTarget.name,
      createdAt:message.createdAt,
      message:"message" in message ? message.message : "images",
      isOnline:false,
    }    
      
    addChatToList(newChat); 
  }
  const onTyping = (isTyping:boolean) => {
    socket.emit("typing",userTarget.id, isTyping);
  }
  return (
    <div className="h-full sm:h-[91%] bg-light dark:bg-dark-dark flex flex-col overflow-hidden rounded-t-2xl rounded-b-none sm:rounded-2xl m-0 sm:mx-3 relative">
      <FriendRequest socket={socket} target={userTarget.id as string} />
      <MessageContent 
      messages={messages}
      newMessages={(messages) => addMessages(messages)}
      isTyping={isTyping}
      targetUsername={userTarget.username}
      /> 
      <div className="w-full">
        <ChatInput onTyping={(isTyping) => onTyping(isTyping)} targetId={userTarget.id as string} setMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatBody



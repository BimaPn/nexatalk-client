"use client"

import { useState, createContext } from "react"

type MessageProvider = {
  messages: (UserMessage|MediaMessage)[]
  deleteMessage: (messageId:string) => void
  addMessage: (message: UserMessage | MediaMessage) => void
}

export const messageContext = createContext<MessageProvider>({
    messages:[],
    addMessage: ()=> {},
    deleteMessage: ()=> {}

});

const MessageProvider = ({children, defaultMessages}:{children:React.ReactNode, defaultMessages?: UserMessage[] }) => {
  const [messages,setMessages] = useState<(UserMessage|MediaMessage)[]>(defaultMessages ?? []);
  
  const addMessage = (message: UserMessage | MediaMessage) => {
    setMessages(prev => [...prev,message]);
  }
  const deleteMessage = (messageId:string) => {
    setMessages((prev) => {
      return prev.filter((item) => item.id !== messageId)
    })
  }
  return (
    <messageContext.Provider value={{ messages, deleteMessage, addMessage }}>
    {children}
    </messageContext.Provider>
  )
}

export default MessageProvider

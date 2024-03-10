"use client"

import { useState, createContext } from "react"

type MessageProvider = {
  messages: (UserMessage|MediaMessage)[]
  deleteMessage: (messageId:string) => void
  addMessage: (message: UserMessage | MediaMessage) => void
  addMessages: (messages: (UserMessage | MediaMessage)[]) => void
}

export const messageContext = createContext<MessageProvider>({
    messages:[],
    addMessage: ()=> {},
    addMessages: ()=> {},
    deleteMessage: ()=> {}

});

const MessageProvider = ({children, defaultMessages}:{children:React.ReactNode, defaultMessages?: UserMessage[] }) => {
  const [messages,setMessages] = useState<(UserMessage|MediaMessage)[]>(defaultMessages ?? []);
  
  const addMessage = (message: UserMessage | MediaMessage) => {
    setMessages(prev => [...prev,message]);
  }
  const addMessages = (messages:(UserMessage | MediaMessage)[]) => {
    setMessages(prev => [...messages,...prev]);
  }
  const deleteMessage = (messageId:string) => {
    setMessages((prev) => {
      return prev.filter((item) => item.id !== messageId)
    })
  }
  return (
    <messageContext.Provider value={{ messages, deleteMessage, addMessage, addMessages }}>
    {children}
    </messageContext.Provider>
  )
}

export default MessageProvider

"use client"

import { useState } from "react"
const MAX_MESSAGE_LENGTH = 768;
const Message = ({message,isCurrentUser=false,className}:Message) => {
  const [isExpanded,setIsExpanded] = useState<boolean>(message.length <= MAX_MESSAGE_LENGTH);
  return (
    <div className={`${isCurrentUser ? "bg-primary text-white":"bg-white text-black"} rounded-[9px] flexCenter px-2 py-[6px] ${className}`}>
      <p className="w-fit text-sm">
        {isExpanded ? message : message.slice(0,MAX_MESSAGE_LENGTH)}
        {isExpanded == false && (
          <span className="font-medium ml-2 cursor-pointer" onClick={() => setIsExpanded(true)}>read more</span>
        )}
      </p>
    </div>
  )
}

export default Message

"use client"

import { useState } from "react"
const MAX_MESSAGE_LENGTH = 768;
const Message = ({message,isCurrentUser=false,className}:Message) => {
  const [isExpanded,setIsExpanded] = useState<boolean>(message.length <= MAX_MESSAGE_LENGTH);
  return (
    <div className={`${isCurrentUser ? "bg-primary dark:bg-semiLight dark:text-dark text-white":"bg-white text-black dark:bg-dark-netral dark:text-white"} rounded-[9px] flexCenter px-2 py-[6px] ${className}`}>
      <p className="text-sm break-all">
        {isExpanded ? message : message.slice(0,MAX_MESSAGE_LENGTH)}
        {isExpanded == false && (
          <span className="font-medium ml-2 cursor-pointer" onClick={() => setIsExpanded(true)}>read more</span>
        )}
      </p>
    </div>
  )
}

export default Message

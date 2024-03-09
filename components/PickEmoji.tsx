"use client"
import { GrEmoji } from "react-icons/gr"
import EmojiPicker from 'emoji-picker-react'
import { useState } from "react"
import { useTheme } from "next-themes"
import Dropdown from "./ui/Dropdown"

const PickEmoji = ({onEmojiClick}:{onEmojiClick:(emoji: string)=>void}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { resolvedTheme } = useTheme();
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <GrEmoji className="text-[22.5px] text-slate-500 dark:text-slate-400 dark:group-hover:text-white stroke-[.4px]" />      
      </Dropdown.Trigger>
      <Dropdown.Content showFromBottom={false} className="bottom-14 left-24">
        <EmojiPicker onEmojiClick={(emojiObject) => onEmojiClick(emojiObject.emoji)} theme={resolvedTheme as any}/>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default PickEmoji

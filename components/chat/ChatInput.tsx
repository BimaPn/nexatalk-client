"use client"
import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useEffect, useRef, useState } from "react"
import { MdOutlineKeyboardVoice } from "react-icons/md"
import TextAreaExpand from "../ui/form/TextAreaExpand"
import MediaInput, { Previews, Trigger } from "../ui/form/MediaInput"
import ApiClient from "@/app/api/axios/ApiClient"

const ChatInput = ({targetId, setMessage, onTyping, className}:{targetId:string, setMessage:(message:UserMessage|MediaMessage)=>void, onTyping:(isTyping:boolean)=>void, className?:string}) => {
  const [messageInput,setMessageInput] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [media,setMedia] = useState<File[]>([]);
  const submitButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if(isFocus && messageInput.length > 0) {
      onTyping(true)
    }else {
      onTyping(false)
    } 
  },[messageInput, isFocus])
  
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    await ApiClient.post(`messages/${targetId}/create`,
    { files:media, message: messageInput }, {
    headers: {
    'Content-Type': 'multipart/form-data'
    }})
    .then((res) => {
      const newMessage = {
        id: res.data.id,
        isCurrentUser:true,
        createdAt: res.data.createdAt,
        date: res.data.date
      }
      if(res.data.media) {
        setMessage({
          ...newMessage,
          media: res.data.media.media
        });
      }
      if(res.data.message) {
        setMessage({
          ...newMessage,
          message: res.data.message.message
        });
      }
      setMedia([]);
      setMessageInput("");
    })
    .catch((err) => {
      console.log(err.response);
    })
  }
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessageInput(e.target.value);
  }
  return (
    <div className={`w-full flexCenter px-2 sm:px-3 pb-3 bg-light dark:bg-dark-dark ${className}`}>

      <form className="w-full" onSubmit={handleSubmit} >
        <MediaInput
        value={media}
        onChange={(results) => setMedia(results)}
        className="flex justify-center items-end gap-[6px] sm:gap-3"
        >
          <Trigger className="min-w-[39px] aspect-square rounded-full bg-white dark:bg-dark-semiDark  flexCenter shadow group">
            <ImAttachment className="px-1 aspect-square text-dark dark:text-slate-400 dark:group-hover:text-white text-[26px]" />      
          </Trigger>

          <div className="w-full flex flex-col gap-3">
            <Previews />
            <div className="w-full flex items-center gap-2 bg-white dark:bg-dark-semiDark rounded-full px-3 py-[2px] shadow">
              <div className="group">
                <GrEmoji className="text-[22.5px] text-slate-500 dark:text-slate-400 dark:group-hover:text-white stroke-[.4px]" />      
              </div>
              <div className="w-full max-h-[108px] overflow-auto py-[7px]">
                <TextAreaExpand 
                value={messageInput}
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                handleSubmit={() => submitButton.current?.click()}
                className="text-[15px] placeholder:text-slate-500 dark:placeholder:text-slate-400"
                rows={1}
                placeholder="Type something..." />
              </div>
              {(messageInput.length !== 0 || media.length !== 0) && (
              <button type="submit" ref={submitButton}>
                <IoSend className="text-[19px] text-primary"/>
              </button>
              )}
            </div>
          </div>
          <div className="min-w-[39px] aspect-square rounded-full bg-white dark:bg-dark-semiDark flexCenter shadow group">
            <MdOutlineKeyboardVoice className="text-2xl text-dark dark:text-slate-400 dark:group-hover:text-white" />      
          </div>
        </MediaInput>
      </form> 
    </div>
  )
}

export default ChatInput

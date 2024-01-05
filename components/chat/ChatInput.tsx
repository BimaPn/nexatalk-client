"use client"
import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useRef, useState } from "react"
import { MdOutlineKeyboardVoice } from "react-icons/md"
import TextAreaExpand from "../ui/form/TextAreaExpand"
import MediaInput, { Previews, Trigger } from "../ui/form/MediaInput"
import ApiClient from "@/app/api/axios/ApiClient"

const ChatInput = ({targetId, setMessage, className}:{targetId:string, setMessage:(message:UserMessage|MediaMessage)=>void,className?:string}) => {
  const [messageInput,setMessageInput] = useState<string>("");
  const [media,setMedia] = useState<File[]>([]);
  const submitButton = useRef<HTMLButtonElement>(null);
  
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    await ApiClient.post(`messages/${targetId}/create`,
    { files:media, message: messageInput }, {
    headers: {
    'Content-Type': 'multipart/form-data'
    }})
    .then((res) => {
      const newMessage = {
        isCurrentUser:true,
        createdAt: res.data.createdAt
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
  return (
    <div className={`w-full flexCenter px-2 sm:px-3 pb-3 bg-light dark:bg-dark-dark ${className}`}>

      <form className="w-full" onSubmit={handleSubmit} >
        <MediaInput
        value={media}
        onChange={(results) => setMedia(results)}
        className="flex justify-center items-end gap-[6px] sm:gap-3"
        >
          <Trigger className="min-w-[38px] sm:min-w-[39px] aspect-square rounded-full bg-white dark:bg-dark-netral flexCenter shadow">
            <ImAttachment className="px-1 aspect-square text-dark dark:text-white text-[26px]" />      
          </Trigger>

          <div className="w-full flex flex-col gap-3">
            <Previews />
            <div className="w-full flex items-center gap-2 bg-white dark:bg-dark-netral rounded-full px-3 py-[2px] shadow">
              <div className="">
                <GrEmoji className="text-[22.5px] text-slate-500 dark:text-slate-400 stroke-[.4px]" />      
              </div>
              <div className="w-full max-h-[108px] overflow-auto py-[6px] sm:py-[7px]">
                <TextAreaExpand 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
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
          <div className="min-w-[38px] sm:min-w-[39px] aspect-square rounded-full bg-white dark:bg-dark-netral flexCenter shadow">
            <MdOutlineKeyboardVoice className="text-2xl text-dark dark:text-white" />      
          </div>
        </MediaInput>
      </form> 
    </div>
  )
}

export default ChatInput

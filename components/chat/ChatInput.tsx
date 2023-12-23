"use client"
import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useRef, useState } from "react"
import { getCurrentTime } from "@/utils/converter"
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
    <div className={`w-full flexCenter px-2 sm:px-3 pb-2 bg-light ${className}`}>

      <form className="w-full" onSubmit={handleSubmit} >
        <MediaInput
        value={media}
        onChange={(results) => setMedia(results)}
        className="flex justify-center items-end gap-1 sm:gap-3"
        >
          <Trigger className="min-w-[40px] aspect-square rounded-full bg-white flexCenter shadow">
            <ImAttachment className="px-1 aspect-square text-dark text-[26px]" />      
          </Trigger>

          <div className="w-full flex flex-col gap-3">
            <Previews />
            <div className="w-full flex items-center gap-3 bg-white rounded-full px-4 py-[2px] shadow">
              <div className="w-full max-h-[64px] overflow-auto py-2">
                <TextAreaExpand 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                handleSubmit={() => submitButton.current?.click()}
                className="text-[15px]"
                rows={1}
                placeholder="Type something..." />
              </div>
              {(messageInput.length !== 0 || media.length !== 0) && (
              <button type="submit" ref={submitButton}>
                <IoSend className="text-[20px] text-primary"/>
              </button>
              )}
            </div>
          </div>

          <div className="min-w-[40px] aspect-square rounded-full bg-white flexCenter shadow">
            <GrEmoji className="text-[22.5px] text-dark stroke-[.4px]" />      
          </div>
          <div className="min-w-[40px] aspect-square rounded-full bg-white flexCenter shadow">
            <MdOutlineKeyboardVoice className="text-2xl text-dark" />      
          </div>
        </MediaInput>
      </form> 
    </div>
  )
}

export default ChatInput

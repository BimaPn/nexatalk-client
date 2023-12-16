"use client"
import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useRef, useState } from "react"
import TextArea from "../ui/TextArea"
import { getCurrentTime } from "@/utils/converter"
import ImageInput,{Trigger,Previews} from "../ui/form/ImageInput"
import { MdOutlineKeyboardVoice } from "react-icons/md"

const ChatInput = ({setMessage,className}:{setMessage:(message:UserMessage|ImagesMessage)=>void,className?:string}) => {
  const [messageInput,setMessageInput] = useState<string>("");
  const [images,setImages] = useState<File[]>([]);
  const submitButton = useRef<HTMLButtonElement>(null);
  
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const createdAt = getCurrentTime();
    if(images.length !== 0) {
      const imagesMessage:ImagesMessage = {
        images:images,
        isCurrentUser:true,
        createdAt:createdAt
      }
     setMessage(imagesMessage); 
     setImages([]);
    }
    if(messageInput.length !== 0) {
      const newMessage:UserMessage = {
        message: messageInput,
        createdAt : getCurrentTime(),
        isCurrentUser : true,
      }
      setMessage(newMessage);
      setMessageInput("")
    }
  }
  return (
    <div className={`w-full flexCenter px-2 sm:px-3 pb-2 bg-light ${className}`}>

      <form className="w-full" onSubmit={handleSubmit} >
        <ImageInput 
        value={images}
        onChange={(results) => setImages(results)}
        className="flex justify-center items-end gap-1 sm:gap-3"
        >
          <div className="min-w-[40px] aspect-square rounded-full bg-white flexCenter shadow">
            <MdOutlineKeyboardVoice className="text-2xl text-dark" />      
          </div>

          <div className="w-full flex flex-col gap-3">
            <Previews />
            <div className="w-full flex items-center gap-3 bg-white rounded-full px-4 py-[2px] shadow">
              <div className="w-full max-h-[64px] overflow-auto py-2">
                <TextArea 
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                handleSubmit={() => submitButton.current?.click()}
                className="text-[15px]"
                rows={1}
                placeholder="Type something..." />
              </div>
              {(messageInput.length !== 0 || images.length !== 0) && (
              <button type="submit" ref={submitButton}>
                <IoSend className="text-[20px] text-primary"/>
              </button>
              )}
            </div>
          </div>

          <div className="min-w-[40px] aspect-square rounded-full bg-white flexCenter shadow">
            <GrEmoji className="text-[22.5px] text-dark stroke-[.4px]" />      
          </div>
          <Trigger className="min-w-[40px] aspect-square rounded-full bg-white flexCenter shadow">
            <ImAttachment className="px-1 aspect-square text-dark text-[26px]" />      
          </Trigger>
        </ImageInput>
      </form> 
    </div>
  )
}

export default ChatInput

"use client"
import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useRef, useState } from "react"
import TextArea from "../ui/TextArea"
import { getCurrentTime } from "@/utils/converter"
import ImageInput,{Trigger,Previews} from "../ui/form/ImageInput"

const ChatInput = ({setMessage,className}:{setMessage:(message:UserMessage|ImagesMessage)=>void,className?:string}) => {
  const [messageInput,setMessageInput] = useState<string>("");
  const [images,setImages] = useState<File[]>([]);
  const submitButton = useRef<HTMLButtonElement>(null);
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    const createdAt = getCurrentTime();
    if(images.length !== 0) {
      const imagePreviews = images.map((file:File) => URL.createObjectURL(file));
      const imagesMessage:ImagesMessage = {
        images:imagePreviews,
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
    <div className={`w-full flexCenter px-4 pb-5 pt-3 ${className}`}>

      <form className="w-full" onSubmit={handleSubmit} >
        <ImageInput 
        value={images}
        onChange={(results) => setImages(results)}
        className="w-[95%] flex flex-col bg-white rounded-2xl px-4 py-[3px] shadow">

          <Previews />

          <div className="flex items-center gap-3">

          <div className="w-full max-h-[64px] overflow-auto py-[10px]">
            <TextArea 
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            handleSubmit={() => submitButton.current?.click()}
            className="text-[15px]"
            rows={1}
            placeholder="Type something..." />
          </div>
          <div>
            <GrEmoji className="text-[22.5px] text-netral stroke-[.4px]" />      
          </div>
          <Trigger>
            <ImAttachment className="px-1 aspect-square text-netral text-[28.5px] " />      
          </Trigger>

          <button type="submit" ref={submitButton}>
            <IoSend className="text-[21px] text-primary"/>
          </button>
          </div>

        </ImageInput>
      </form> 
    </div>
  )
}

export default ChatInput

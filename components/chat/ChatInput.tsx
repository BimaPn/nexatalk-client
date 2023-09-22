import { IoSend } from "react-icons/io5"
import { PiImageSquareFill } from "react-icons/pi"
import { GrEmoji} from "react-icons/gr"
import { ImAttachment } from "react-icons/im"
import { useState } from "react"
import TextArea from "../ui/TextArea"

const ChatInput = ({setMessage}:{setMessage:(message:GroupMessage)=>void}) => {
  const [messageInput,setMessageInput] = useState<string>("");
  const onSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if(messageInput.length === 0) return;
    const newMessage:GroupMessage = {
      id: "hahahah",
      image: "/images/people/dodikurniawan.jpg",
      message: messageInput,
      name : "Dodi Kurniawan",
      time : "13.00 PM",
      isCurrentUser : true,
    }
    setMessage(newMessage);
    setMessageInput("")
  }
  return (
    <div className="w-full flexCenter px-4 pb-5 pt-3">
      <form onSubmit={onSubmit} className="w-[95%] flex items-center bg-white rounded-xl gap-3 px-4 py-[3px] shadow">
        <div className="w-full max-h-[64px] overflow-auto">
          <TextArea 
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="text-[15px] py-[8px]"
          rows={1}
          placeholder="Type something..." />
        </div>
        <div>
          <GrEmoji className="text-[22.5px] text-netral stroke-[.4px]" />      
        </div>
          <ImAttachment className="px-1 aspect-square text-netral text-[28.5px] " />      
        <button type="submit">
          <IoSend className="text-[21px] text-primary"/>
        </button>
      </form> 
    </div>
  )
}

export default ChatInput

import RoundedImage from "../RoundedImage"
import Message from "./Message"

const GroupMessage = ({message,createdAt,image,name,isCurrentUser=false,className}:GroupMessage) => {
  return (
    <div className={`max-w-[80%] flex gap-[10px] ${isCurrentUser ? "flex-row-reverse":"flex-row"} ${className}`}>
      <RoundedImage src={image} alt={name} className="!min-w-[32px]" />
      <div className={`flex flex-col gap-[6px] ${isCurrentUser ? "items-end" : "items-start"}`}>
        <div className={`flex items-center gap-3 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
          <span className="text-black text-sm">{isCurrentUser ? "You" : name}</span>
          <span className="text-xs text-semiDark">{createdAt}</span>
        </div>
        <Message message={message} isCurrentUser={isCurrentUser} className="!w-fit"/>
      </div>
    </div>
  )
}

export default GroupMessage

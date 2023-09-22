import Message from "./Message"

const UserMessage = ({message,time,isCurrentUser=false,className}:UserMessage) => {
  return (
    <div className={`w-fit flex flex-col gap-1 ${isCurrentUser ? "items-start":"items-end "} ${className}`}>
      <Message message={message} isCurrentUser={isCurrentUser} className="!w-full"/>
      <span className="text-xs text-semiDark">{time}</span>
    </div>
  )
}

export default UserMessage

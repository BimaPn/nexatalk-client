import Message from "./Message"

const UserMessage = ({message,createdAt,isCurrentUser=false,className}:UserMessage) => {
  return (
    <div className={`w-fit flex flex-col gap-1 ${isCurrentUser ? "items-start":"items-end "} ${className}`}>
      <Message message={message} isCurrentUser={isCurrentUser} className="!w-full"/>
      <span className="text-xs text-semiDark">{createdAt}</span>
    </div>
  )
}

export default UserMessage

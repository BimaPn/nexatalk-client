import RoundedImage from "./RoundedImage"

const ChatItem = ({avatar,name,message,createdAt,unread}:ChatItem) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 py-2 px-3 rounded-xl hover:bg-light">
      <RoundedImage src={avatar} className="!min-w-[49px]" alt={name} />
      <div className="w-full flex flex-col items-center gap-[1px]">
        <div className="w-full flex items-center justify-between">
          <span className="text-black">{name}</span>
          <span className="text-[12px] text-semiDark">{createdAt}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="w-[85%] text-[15px] text-semiDark line-clamp-1">{message}</span>
          {unread && (
            <div className={`px-[6px] py-[2px] font-medium bg-primary text-white rounded-full text-xs`}>{unread}</div>
          )}

        </div>
      </div>
      
    </div>
  )
}

export default ChatItem

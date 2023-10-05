import RoundedImage from "./RoundedImage"

const ChatItem = ({imageSrc,name,messege,time}:ChatItem) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 py-2 px-3 rounded-xl hover:bg-light">
      <RoundedImage src={imageSrc} className="!min-w-[48px]" alt={name} />
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <span className="text-black">{name}</span>
          <span className="text-[12px] text-semiDark">{time}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className="w-[85%] text-[15px] text-semiDark line-clamp-1">{messege}</span>
        </div>
      </div>
      
    </div>
  )
}

export default ChatItem

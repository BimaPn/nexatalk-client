import RoundedImage from "./RoundedImage"

const ChatItem = ({avatar,name,message,createdAt,unread,isOnline}:ChatItem) => {
  return (
    <div className="w-full flex items-center justify-between gap-2 py-2 px-3 rounded-xl hover:bg-light">
      <UserAvatar avatar={avatar} alt={name} isOnline={isOnline} className="!min-w-[49px]" />
      <div className="w-full flex flex-col items-center gap-[1px]">
        <div className="w-full flex items-center justify-between">
          <span className="text-black">{name}</span>
          <span className="text-[12px] text-semiDark">{createdAt}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className={`w-[85%] text-[15px] text-semiDark line-clamp-1 ${unread ? "font-bold":"font-normal"}`}>{message}</span>
          {unread && (
            <div className={`px-1 aspect-square font-medium bg-primary text-white rounded-full text-xs`}></div>
          )}
        </div>
      </div>
      
    </div>
  )
}

export const UserAvatar = ({avatar,alt,isOnline,className}:{avatar:string,alt:string,isOnline:boolean|number,className?:string}) => {
  return(
  <div className="relative">
    <RoundedImage src={avatar} className={className} alt={alt} />
    {isOnline ? (
      <span className="absolute bottom-[2%] right-[2%] w-[13px] aspect-square bg-yellow-400 rounded-full border border-white"></span>
    ):null}
  </div>
  )
}

export default ChatItem

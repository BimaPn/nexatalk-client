import RoundedImage from "./RoundedImage"

const ChatItem = ({avatar,name,message,createdAt,unread,isOnline}:ChatItem) => {
  return (
    <div className="w-full flex items-center justify-between gap-[9px] py-2 px-3 rounded-xl hover:bg-light dark:hover:bg-dark-netral relative z-0">
      <UserAvatar avatar={avatar} alt={name} isOnline={isOnline} className="!min-w-[44px]" />
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-between">
          <span className="text-black dark:text-white">{name}</span>
          <span className="text-[11.5px] text-semiDark dark:text-slate-400">{createdAt}</span>
        </div>
        <div className="w-full flex items-center justify-between">
          <span className={`w-[85%] text-[15px] text-semiDark dark:text-slate-400 line-clamp-1 ${unread ? "font-bold":"font-normal"}`}>{message}</span>
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
  <div className="relative z-0">
    <RoundedImage src={avatar} className={className} alt={alt} />
    {isOnline ? (
      <span className="absolute bottom-[2%] right-[2%] w-[11px] aspect-square bg-yellow-400 rounded-full border border-white"></span>
    ):null}
  </div>
  )
}

export default ChatItem

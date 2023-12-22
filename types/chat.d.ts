interface ChatItem {
  username?:string,
  avatar:string,
  name:string,
  message:string,
  createdAt:string,
  unread?:number | string,
  isOnline:boolean,
}

interface ChatList {
  chatlists : ChatItem[],
  setChatlists : Dispatch<SetStateAction<ChatItem[]>>,
  addChatToList : (chat:ChatItem) => void,
  clearUnreadCount : (targetId:string) => void,
  setOnlineUser : (userId:string,isOnline:boolean) => void
}  

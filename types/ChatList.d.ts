interface ChatList {
  chats : ChatItem[],
  addChatToList : (chat:ChatItem) => void,
  clearUnreadCount : (targetId:string) => void,
  setOnlineUser : (userId:string,isOnline:boolean) => void
}

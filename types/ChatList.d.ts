interface ChatList {
  chats : ChatItem[],
  setChats : Dispatch<SetStateAction<ChatItem[]>>,
  addChatToList : (chat:ChatItem) => void,
}

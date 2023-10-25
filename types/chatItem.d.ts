interface ChatItem {
  id?:string,
  avatar:string,
  name:string,
  message:string,
  createdAt:string,
  unread?:number | string,
  isOnline:boolean,
}  

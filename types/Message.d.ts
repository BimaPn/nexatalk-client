interface Message {
  message : string
  isCurrentUser ?: boolean

  className ?:string
}

interface GeneralMessage {
  id : string
  date?: string
}
interface UserMessage extends Message, GeneralMessage {
  createdAt : string
}

interface GroupMessage extends Message,UserMessage {
  image : string;
  name : string;
}

interface MediaMessage extends GeneralMessage {
  media : string[]|File[],
  createdAt : string,
  isCurrentUser : boolean
}

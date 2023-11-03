interface Message {
  message : string;
  isCurrentUser ?: boolean;
  className ?:string;
}

interface UserMessage extends Message {
  id ?: string,
  createdAt : string;
}

interface GroupMessage extends Message,UserMessage {
  image : string;
  name : string;
}

interface ImagesMessage {
  id ?: string,
  images : string[]|File[],
  createdAt : string,
  isCurrentUser : boolean
}

interface Message {
  message : string;
  isCurrentUser ?: boolean;
  className ?:string;
}

interface UserMessage extends Message {
  time : string;
}

interface GroupMessage extends Message,UserMessage {
  id : string;
  image : string;
  name : string;
}

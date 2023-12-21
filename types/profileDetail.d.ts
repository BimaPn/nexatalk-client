interface ProfileDetail {
  isOpen:boolean,
  setIsOpen:Dispatch<SetStateAction<boolean>>
}

interface UserTarget {
  username:string,
  name:string,
  avatar:string,
  bio:string
}

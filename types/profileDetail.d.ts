interface ProfileDetail {
  isOpen:boolean,
  setIsOpen:Dispatch<SetStateAction<boolean>>
}

interface UserTarget {
  id?:string,
  username:string,
  name:string,
  avatar:string,
  bio:string
}

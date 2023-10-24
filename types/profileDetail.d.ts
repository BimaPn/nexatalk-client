interface ProfileDetail {
  isOpen:boolean,
  setIsOpen:Dispatch<SetStateAction<boolean>>
}

interface UserTarget {
  id:string,
  name:string,
  avatar:string,
  bio?:string
}

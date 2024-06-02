import { HiOutlineDotsVertical } from "react-icons/hi"
import Dropdown from "./ui/Dropdown"
import { IoMdTrash } from "react-icons/io"
import DeleteMessage from "./DeleteMessage"

const MessageOption = ({messageId}:{messageId:string}) => {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <HiOutlineDotsVertical />
      </Dropdown.Trigger> 
      <Dropdown.Content  className="right-0 w-20 text-black dark:text-white">
       <div className="bg-white dark:bg-dark-netral flex flex-col shadow rounded-lg py-1 px-1 font-medium text-[13px]">
        <DeleteMessage messageId={messageId} />
       </div>
      </Dropdown.Content>
    </Dropdown>
  )
}

export default MessageOption

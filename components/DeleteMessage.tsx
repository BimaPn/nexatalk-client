"use client"
import ApiClient from '@/app/api/axios/ApiClient';
import { useContext } from 'react';
import { IoMdTrash } from 'react-icons/io'
import { SocketProvider, socketContext } from './providers/SocketProvider';
import { messageContext } from './providers/MessageProvider';

const DeleteMessage = ({messageId}:{messageId:string}) => {
  const { chatSocket } = useContext(socketContext) as SocketProvider;
  const { deleteMessage } = useContext(messageContext);
  const deleteButton = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deleteMessageRequest = () => {
      ApiClient.delete(`/messages/${messageId}/delete`)
      .then((res) => {
        chatSocket?.emit("deleteMessage",messageId, res.data.receiverId);
        deleteMessage(messageId);
      })
      .catch((err) => {
        console.log(err.response.data)
      })
    }

    const isDelete = confirm("Are you sure you want delete this message ?")

    if(isDelete) {
      deleteMessageRequest()
    }
  }
  return (
    <button onClick={deleteButton} className="w-full flex items-center gap-[2px] px-1 py-1 hover:bg-light dark:hover:bg-dark-semiLight rounded-lg cursor-pointer">
      <IoMdTrash className="text-[19px]" />
      <span className="font-medium">Delete</span>
    </button>
  )
}

export default DeleteMessage

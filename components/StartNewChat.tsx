import { BiSolidMessageDetail } from 'react-icons/bi'
import Modal, { Body, CloseButton, Content, Header, ModalProvider, Trigger, modalContext } from './ui/Modal'
import { IoMdClose } from 'react-icons/io'
import TextInput from './ui/form/TextInput'
import { FiSearch } from "react-icons/fi"
import RoundedImage from './ui/RoundedImage'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
import ApiClient from '@/app/api/axios/ApiClient'
import NewChat from './ilustrations/NewChat'
import NotFound from './NotFound'
import ChatMenuSkeleton from './skeletons/ChatMenuSkeleton'

type UserItem = {
  name:string
  username:string
  bio:string
  avatar:string
}

const StartNewChat = () => {
  return (
    <Modal>
      <Contents />
    </Modal>
  )
}

const Contents = () => {
  const { showModal } = useContext(modalContext) as ModalProvider;
  return (
    <>
      <Trigger className="absolute bottom-4 right-4 w-[46px] aspect-square flexCenter bg-primary rounded-full shadow">
        <BiSolidMessageDetail className="text-[23px] text-white" />
      </Trigger>
      {showModal && (
        <ModalContent />
      )}
    </>
  )
}
const ModalContent = () => {
  const [users, setUsers] = useState<UserItem[]|null>(null);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if(query.length <= 0) {
      setUsers(null)
      return
    }
    setLoading(true)
    ApiClient.get(`users/search?username=${query}`)  
    .then((res) => {
      setLoading(false)
      setUsers(res.data.users)
    })
    .catch((err) => {
      console.log(err.response.data)
    })
  },[query])
  return (
    <Content width={450} className='sm:!h-[80%]'>
      <Header>
        <ModalHeader />
      </Header>
      <Body className='px-4 pt-4'>
        <div className='relative px-3'>
          <TextInput
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="dark:text-white !pl-10"
          placeholder='Search User'
          />
          <div className='h-full aspect-square absolute top-0 left-3 flexCenter dark:peer-focus:text-white peer-focus:text-dark text-gray-400 dark:text-gray-300'>
            <FiSearch className="text-[21px]" />
          </div>
        </div>
        {(!users && !loading) && (
          <div className='h-[68%] flexCenter flex-col gap-4'>
            <div className='flexCenter flex-col gap-1'>
            <span className='font-bold text-lg text-dark dark:text-white'>Let's Find Your Bestie !</span>
            <span className='text-sm text-semiDark dark:text-slate-300'>Find some to start chat with i dont know bro.</span>
            </div>
            <NewChat />
          </div>
        )}
        {(!loading && users && users?.length <= 0) && (
          <NotFound className='h-[30%]'/>
        )}

        {loading && (
          <ChatMenuSkeleton count={2}/>
        )}
        {(users && users?.length >= 0 && !loading) && (
          <div className='flex flex-col gap-[6px] mt-6'>
            {users.map((user) => (
              <UserItem 
              key={user.username}
              name={user.name}
              username={user.username}
              bio={user.bio} 
              avatar={user.avatar}
              />
            ))}
          </div>
        )}
      </Body>
    </Content>
  )
}
const UserItem = ({name, username, bio, avatar}:UserItem) => {
  const { toggleModal } = useContext(modalContext) as ModalProvider;
  return (
    <Link onClick={() => toggleModal()} href={`/chat/${username}`} className="flex items-center gap-[10px] p-2 rounded-xl hover:bg-light dark:hover:bg-dark-netral">
      <RoundedImage src={avatar} alt="user" />
        <div className='flex flex-col'>
          <span className="text-black dark:text-white">{name}</span>
          <span className={`text-[15px] text-semiDark dark:text-slate-400 line-clamp-1`}>{bio}</span>
        </div>
    </Link>
      )
}
const ModalHeader = () => {
  return (
    <div className="grid grid-cols-3 px-4 py-4">
      <div>
        <CloseButton className="w-10 aspect-square flexCenter">
          <IoMdClose className="text-[22px]" />
        </CloseButton> 
      </div>
      <span className="w-full block flexCenter font-medium">Search User</span>
      <div></div>
    </div>
    )
}

export default StartNewChat

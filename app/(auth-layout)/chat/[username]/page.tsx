import ChatHeader from '@/components/chat/ChatHeader'
import ChatBody from '@/components/chat/ChatBody'
import ChatInput from '@/components/chat/ChatInput'
import ProfileInfo from '@/components/menu/ProfileInfo'
import ChatSection from '@/components/chat/ChatSection'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import ApiServer from '@/app/api/axios/ApiServer'

const page = async ({params}:{params : {username:string}}) => {
  const session = await getServerSession(authOptions);
  const messages = await ApiServer(session?.user.accessToken as string).post(`users/${params.username}/messages`);
  return (
  <div className="w-full bg-white h-screen flex">
    <ChatSection accessToken={session?.user.accessToken as string} userId={params.username} defaultMessages={messages.data.messages} />
    <ProfileInfo />
  </div>
  )
}

export default page

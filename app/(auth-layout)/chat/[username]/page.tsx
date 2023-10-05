import ChatHeader from '@/components/chat/ChatHeader'
import ChatBody from '@/components/chat/ChatBody'
import ChatInput from '@/components/chat/ChatInput'
import ProfileInfo from '@/components/menu/ProfileInfo'
import ChatSection from '@/components/chat/ChatSection'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const page = async ({params}:{params : {username:string}}) => {
  const session = await getServerSession(authOptions);
  return (
  <div className="w-full bg-white h-screen flex">const
    <ChatSection accessToken={session?.user.accessToken as string} userId={params.username} />
    <ProfileInfo />
  </div>
  )
}

export default page

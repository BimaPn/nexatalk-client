import ChatMenu from '@/components/menu/ChatMenu'
import type { Metadata } from 'next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import ApiServer from '@/app/api/axios/ApiServer'
import ChatListProvider from '@/components/providers/ChatListProvider'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);
  const chatList = await ApiServer(session?.user.accessToken as string).post(`chat/list`);
  return (
    <section className='flex gap-4 h-screen p-0 sm:px-4 sm:py-4'>
      <ChatListProvider defaultChatList={chatList.data.users}>
        <ChatMenu accessToken={session?.user.accessToken as string} />
        {children}
      </ChatListProvider>
    </section>
  )
}

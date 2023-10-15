import ChatMenu from '@/components/menu/ChatMenu'
import type { Metadata } from 'next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import ApiServer from '@/app/api/axios/ApiServer'

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
  const messages = await ApiServer(session?.user.accessToken as string).post(`chat/list`);
  return (
    <section className='flex h-screen'>
      <ChatMenu accessToken={session?.user.accessToken as string} defaultChatList={messages.data.users} />
      {children}
    </section>
  )
}

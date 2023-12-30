import type { Metadata } from 'next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import ChatListProvider from '@/components/providers/ChatListProvider'
import SocketProvider from '@/components/providers/SocketProvider'
import MainMenu from '@/components/menu/MainMenu'
import MenuProvider from '@/components/providers/MenuProvider'
import UserSessionProvider from '@/components/providers/UserSessionProvider'
import StoryListProvider from '@/components/providers/StoryListProvider'

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
  const { id, name, username, email, bio, avatar } = session?.user as any;
  return (
    <section className='flex gap-4 h-screen p-0 overflow-hidden sm:px-4 sm:py-4'>
      <SocketProvider accessToken={session?.user.accessToken as string}>
        <ChatListProvider>
          <StoryListProvider>
            <UserSessionProvider defaultSession={{ id, name, username, email, bio, avatar }}>
              <MenuProvider>
                <MainMenu
                accessToken={session?.user.accessToken as string}
                />
              </MenuProvider>
            </UserSessionProvider>
          </StoryListProvider>
          {children}
        </ChatListProvider>
      </SocketProvider>
    </section>
  )
}

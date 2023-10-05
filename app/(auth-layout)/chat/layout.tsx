import ChatMenu from '@/components/menu/ChatMenu'
import type { Metadata } from 'next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

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
  return (
    <section className='flex h-screen'>
      <ChatMenu accessToken={session?.user.accessToken as string} />
      {children}
    </section>
  )
}

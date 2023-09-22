import ChatMenu from '@/components/menu/ChatMenu'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='flex h-screen'>
        < ChatMenu />
        {children}
    </section>
  )
}

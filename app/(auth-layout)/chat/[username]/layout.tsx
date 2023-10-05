
import ChatMenu from '@/components/menu/ChatMenu'
import type { Metadata } from 'next'
import ProfileDetailProvider from '@/components/providers/ProfileDetailProvider'

export const metadata: Metadata = {
  title: 'Detail Chat',
  description: 'Chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <ProfileDetailProvider>{children}</ProfileDetailProvider>
  )
}

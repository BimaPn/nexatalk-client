
import ChatMenu from '@/components/menu/ChatMenu'
import type { Metadata } from 'next'
import ProfileDetailProvider from '@/components/providers/ProfileDetailProvider'
import MediaViewerProvider from '@/components/providers/MediaViewerProvider'

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
  <ProfileDetailProvider>
    <MediaViewerProvider>
    {children}
    </MediaViewerProvider>
  </ProfileDetailProvider>
  )
}

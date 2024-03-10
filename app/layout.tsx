import "./css/globals.css"
import "./css/skeleton.css"
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider'
import ThemeProvider from "@/components/providers/ThemeProvider"
import ReactQueryProvider from "@/components/providers/ReactQueryProvider"
const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'] }
  )

export const metadata: Metadata = {
  title: 'Chat App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

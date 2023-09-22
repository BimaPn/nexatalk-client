import MainLayout from '@/layouts/MainLayout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='flex h-screen'>
      <MainLayout>
        {children}
      </MainLayout>
    </section>
  )
}

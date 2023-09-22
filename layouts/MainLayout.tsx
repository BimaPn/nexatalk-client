import Navigation from '@/components/ui/Navigation'

const MainLayout = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <>
    <header>
      <Navigation />
    </header>
    <main className={`ml-0 ss:ml-16 overflow-hidden top-0 bottom-0 left-16 bg-blue-400 ${className}`}>
        {children}
    </main>
    </>
  )
}

export default MainLayout

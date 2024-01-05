import Navigation from '@/components/ui/Navigation'

const MainLayout = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <>
    <main className={`overflow-hidden top-0 bottom-0 ${className}`}>
        {children}
    </main>
    </>
  )
}

export default MainLayout

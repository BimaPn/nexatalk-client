import React from 'react'

const MenuLayout = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <aside className={`w-[464px] bg-white min-h-full px-2 py-5 ${className} overflow-auto`}>
        {children}
    </aside>
  )
}

export default MenuLayout

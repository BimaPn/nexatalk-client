import React from 'react'

const MenuLayout = ({children,className}:{children:React.ReactNode,className?:string}) => {
  return (
    <aside className={`sm:min-w-[324px] md:min-w-[386px] bg-white min-h-full rounded-xl shadow  ${className} overflow-auto`}>
        {children}
    </aside>
  )
}

export default MenuLayout

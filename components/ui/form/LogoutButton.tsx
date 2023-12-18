import { ButtonHTMLAttributes } from "react"

const LogoutButton = ({className,children,...props}:ButtonHTMLAttributes<HTMLButtonElement> & {children:React.ReactNode,className?:string}) => {
  return (
     <button 
     className={`w-full ${className}`}
      {...props}
      >{children}</button>
  )
}

export default LogoutButton



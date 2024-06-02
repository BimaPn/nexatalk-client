import { ButtonHTMLAttributes } from "react"

const PrimaryButton = ({className,children,...props}:ButtonHTMLAttributes<HTMLButtonElement> & {children:React.ReactNode,className?:string}) => {
  return (
     <button 
     className={`w-full px-6 py-[7px] mt-4 rounded-xl bg-primary text-light font-medium mx-auto disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
      >{children}</button>
  )
}

export default PrimaryButton



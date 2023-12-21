import ApiClient from "@/app/api/axios/ApiClient"
import axios from "axios"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ButtonHTMLAttributes } from "react"

const LogoutButton = ({className,children,...props}:ButtonHTMLAttributes<HTMLButtonElement> & {children:React.ReactNode,className?:string}) => {
  const router = useRouter()
  const logout = (e:React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/logout`,{},{withCredentials:true})  
      .then(() => {
          signOut({redirect:false}).then(() => {router.push('/login')})
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
  }
  return (
     <button 
     className={`w-full ${className}`}
     onClick={logout}
      {...props}
      >{children}</button>
  )
}

export default LogoutButton



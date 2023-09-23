"use client"
import InputLabel from "@/components/ui/form/InputLabel"
import TextInput from "@/components/ui/form/TextInput"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"
import InputError from "@/components/ui/form/InputError"
import { callbackify } from "util"

const LoginForm = () => {
  const [data,setData] = useState({
    email : "",
    password : ""
  });
  const router = useRouter();
  const [error,setError] = useState<string | null>(null);
  const formSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    signIn("credentials",{...data,redirect:false})
    .then((callback) => {
      if(callback?.error) setError(callback.error);
      if(callback?.ok && !callback.error) {
        console.log("berhasil")
        router.push("/chat");
      }
    });
  }
  return (
    <form onSubmit={formSubmit} className="w-96 flex flex-col gap-2">
      <h1 className="font-medium text-2xl text-dark text-center mb-5">Welcome back !</h1>
      <InputError message={error} className="mb-2"/>  
      <div className="relative">  
        <TextInput 
        id="email"
        type="email"
        value={data.email}
        onChange={(e) => setData({...data,email:e.target.value})}
        required
        />
        <InputLabel forInput="email" value="Email"/>
      </div>
      <div className="relative">
        <TextInput 
        id="password"
        type="password"
        value={data.password}
        onChange={(e) => setData({...data,password:e.target.value})}
        required
        />
        <InputLabel forInput="password" value="Password"/>
      </div>
      <Link href={`/forget`} className="text-end text-sm text-semiDark">Forget password ?</Link>
      <button type="submit" className="w-full px-6 py-[7px] mt-4 rounded-xl bg-primary text-light font-bold mx-auto">Login</button>
    </form>
  )
}

export default LoginForm

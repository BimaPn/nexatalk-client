"use client"
import InputError from "@/components/ui/form/InputError"
import InputLabel from "@/components/ui/form/InputLabel"
import TextInput from "@/components/ui/form/TextInput"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

const RegisterForm = () => {
  const [data,setData] = useState({
    name:"",    
    email:"",
    password:"",
    password_confirmation:""
  });
  const router = useRouter();
  const [errors,setErrors] = useState<AuthError>({});
  const formSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/register`,data)
    .then(() => {
        router.push("/login");
    })
    .catch((error) => {
      setErrors(error.response.data);
    });
  }   
  return (
    <form onSubmit={formSubmit} className="w-96 flex flex-col gap-2">
      <h1 className="font-medium text-2xl text-dark text-center mb-5">Create account</h1>
      <InputError message={errors.message} className="mb-2"/>  
      <div className="relative">
        <TextInput 
        id="name"
        type="text"
        value={data.name}
        onChange={(e) => setData({...data,name:e.target.value})}
        required
        />
        <InputLabel forInput="name" value="Name"/>
        <InputError message={errors.name} className="my-1"/>  
      </div>
      <div className="relative">
        <TextInput 
        id="email"
        type="email"
        value={data.email}
        onChange={(e) => setData({...data,email:e.target.value})}
        required
        />
        <InputLabel forInput="email" value="Email"/>
        <InputError message={errors.email} className="my-1"/>  
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
        <InputError message={errors.password} className="my-1"/>  
      </div>
      <div className="relative">
        <TextInput 
        id="password_confirmation"
        type="password"
        value={data.password_confirmation}
        onChange={(e) => setData({...data,password_confirmation:e.target.value})}
        required
        />
        <InputLabel forInput="password_confirmation" value="Confirm password"/>
        <InputError message={errors.password_confirmation} className="my-1" />  
      </div>
      <button type="submit" className="w-full px-6 py-[7px] mt-4 rounded-xl bg-primary text-light font-bold mx-auto">Register</button>
    </form>
  )
}

export default RegisterForm; 

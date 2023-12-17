"use client"
import InputError from "@/components/ui/form/InputError"
import InputLabel from "@/components/ui/form/InputLabel"
import TextInput from "@/components/ui/form/TextInput"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoClose,IoCheckmarkSharp } from "react-icons/io5"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import PrimaryButton from "@/components/ui/form/PrimaryButton"

const RegisterForm = () => {
  const [data,setData] = useState({
    name:"",    
    username : "",
    email:"",
    password:"",
    password_confirmation:""
  });
  const router = useRouter();
  const [errors,setErrors] = useState<AuthError>({});
  const [disableSubmit,setDisableSubmit] = useState<boolean>(true);
  
  useEffect(() => {
  const isEnableSubmit = data.name.length >= 4 && data.username.length >= 6 &&
     data.email.length >= 4 && data.password.length >= 8 &&
     data.password === data.password_confirmation;
  
  if(isEnableSubmit) {
    setDisableSubmit(false);
  }else {
    setDisableSubmit(true);
  }
  },[data]);

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

      <UserNameInput
      onChange={(val) => setData({...data,username:val})}/>

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
      <PrimaryButton disabled={disableSubmit} type="submit">
      Register
      </PrimaryButton>
    </form>
  )
}

const UserNameInput = ({onChange}:{onChange:(val:string) => void}) => {
  const [username,setUsername] = useState<string>("");
  const [error,setError] = useState<string | null>(null);
  const [status,setStatus] = useState<number>(-1);

  const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value.replace(/\s/g, ''));
  }

  useEffect(() => {
    if(username.length < 6) {
      setError("Username must be at least 6 characters.");
      setStatus(0);
      return;
    }
    setStatus(2);
    axios.post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/username-check`,{username})
    .then(() => {
      setStatus(1);
      setError(null);
      onChange(username);
    })
    .catch((error) => {
      setStatus(0);
      setError(error.response.data.message);
      onChange("");
    });
  },[username]);

  const showStatus = () => {
    const passed = <IoCheckmarkSharp className="text-[19px] text-green-500" />
    const failed = <IoClose className="text-[22px] text-red-600" />
    const loading = <LoadingSpinner />

    if(status === 1) return passed;
    else if(status === 0) return failed;
    else if(status === 2) return loading;
    return;
  }

  return (
    <div>
      <div className="relative">
        <TextInput 
        id="username"
        type="text"
        value={username}
        onChange={onChangeInput}
        required
        maxLength={24}
        />
        <div className="absolute flexCenter right-0 top-0 bottom-0 pr-3">
          {showStatus()}
        </div>
        <InputLabel forInput="username" value="Username"/>
      </div>
      <InputError message={error} className="my-1" />  
    </div>

  )
}

export default RegisterForm; 

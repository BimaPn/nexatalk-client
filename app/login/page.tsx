import { FcGoogle } from "react-icons/fc"
import LoginForm from "./LoginForm"
import Link from "next/link"
import Image from "next/image"
import RoundedImage from "@/components/ui/RoundedImage"
import Login from "@/components/ilustrations/Login"

const page = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="w-[40%] bg-semiLight flexCenter">
        <Login />
      </div>
      <div className="w-[60%] flexCenter flex-col px-8 gap-7 bg-white">
        <LoginForm />
        <div className="w-1/3 border-t relative flexCenter">
          <span className="absolute text-netral text-sm bg-white px-3 py-1">or</span>
        </div>
        <div className="flexCenter gap-3 border px-6 py-2 rounded-full">
          <FcGoogle className="text-2xl"/>
          <span className="text-semiDark text-[15px]">Login with Google</span>
        </div>
        <div>
          <p className="text-sm text-semiDark">Dont have an account ? <Link className="font-medium text-dark" href={`/register`}>register</Link></p>
        </div>
      </div>
    </section>
  )
}

export default page

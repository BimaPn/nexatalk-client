import { FcGoogle } from "react-icons/fc"
import LoginForm from "./LoginForm"
import Link from "next/link"
import Image from "next/image"
import RoundedImage from "@/components/ui/RoundedImage"
import Login from "@/components/ilustrations/Login"

const page = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="hidden sm:flex items-center justify-center sm:w-1/2 md:w-[40%] bg-semiLight dark:bg-dark-netral px-6">
        <Login className="md:w-[402px] lg:w-[456px]" />
      </div>
      <div className="w-full sm:w-1/2 md:w-[60%] flexCenter flex-col px-4 gap-7 bg-white dark:bg-dark-semiDark">
        <LoginForm />
        <div className="w-1/3 border-t dark:border-slate-400 relative flexCenter">
          <span className="absolute text-netral dark:text-slate-400 text-sm bg-white dark:bg-dark-semiDark px-3 py-1">or</span>
        </div>
        <div className="flexCenter gap-3 border dark:border-slate-500 px-4 py-2 rounded-xl">
          <FcGoogle className="text-2xl"/>
          <span className="text-semiDark dark:text-dark-light text-[15px]">Login with Google</span>
        </div>
        <div>
          <p className="text-sm text-semiDark dark:text-dark-light">
          Dont have an account ? <Link className="font-medium text-dark dark:text-white" href={`/register`}>register
          </Link></p>
        </div>
      </div>
    </section>
  )
}

export default page

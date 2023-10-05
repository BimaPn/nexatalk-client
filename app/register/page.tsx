import { FcGoogle } from "react-icons/fc"
import RegisterForm from "./RegisterForm"
import Link from "next/link"
import Image from "next/image"

const page = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="w-[40%] bg-semiLight flexCenter">
        <div className="relative w-[70%] aspect-square ">
          < Image 
          src={`/images/register.svg`} 
          alt={`register`}
          fill
          style={{objectFit:"cover"}}
          />
        </div>
      </div>
      <div className="w-[60%] flexCenter flex-col px-8 gap-7 bg-white">
        <RegisterForm />
        <div className="w-1/3 border-t relative flexCenter">
          <span className="absolute text-netral text-sm bg-white px-3 py-1">or</span>
        </div>
        <div className="flexCenter gap-3 border px-6 py-2 rounded-full">
          <FcGoogle className="text-2xl"/>
          <span className="text-semiDark text-[15px]">Login with Google</span>
        </div>
        <div>
          <p className="text-sm text-semiDark">Already have an account ? <Link className="font-medium text-dark" href={`/login`}>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default page

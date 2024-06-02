import { FcGoogle } from "react-icons/fc"
import RegisterForm from "./RegisterForm"
import Link from "next/link"
import Image from "next/image"
// import Register from "@/components/ilustrations/Register"

const page = () => {
  return (
    <section className="w-full h-screen flex">
      <div className="hidden sm:flex items-center justify-center sm:w-1/2 md:w-[40%] bg-semiLight dark:bg-dark-netral px-6">
      </div>
      <div className="w-full sm:w-1/2 md:w-[60%] flexCenter flex-col px-4 gap-5 bg-white dark:bg-dark-semiDark">
        <RegisterForm />
        <div>
          <p className="text-sm text-semiDark dark:text-dark-light">
          Already have an account ? <Link className="font-medium text-dark dark:text-white" href={`/login`}>Login
          </Link></p>
        </div>
      </div>
    </section>
  )
}

export default page

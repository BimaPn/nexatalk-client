import InputLabel from "@/components/ui/form/InputLabel"
import TextInput from "@/components/ui/form/TextInput"
import Link from "next/link"

const LoginForm = () => {
  return (
    <form className="w-96 flex flex-col gap-2">
      <h1 className="font-medium text-2xl text-dark text-center mb-5">Welcome back !</h1>
      <div className="relative">
        <TextInput id="email"/>
        <InputLabel forInput="email" value="Email"/>
      </div>
      <div className="relative">
        <TextInput id="password"/>
        <InputLabel forInput="password" value="password"/>
      </div>
      <Link href={`/forget`} className="text-end text-sm text-semiDark">Forget password ?</Link>
      <button className="w-full px-6 py-[7px] mt-4 rounded-xl bg-primary text-light font-bold mx-auto">Login</button>
    </form>
  )
}

export default LoginForm

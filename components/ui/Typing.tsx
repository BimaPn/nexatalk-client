
const Typing = () => {
  return (
    <li className="w-fit px-3 flexCenter gap-[6px] py-[13px] dark:bg-dark-netral rounded-xl">
      <span className={`w-[7px] aspect-square rounded-full bg-white custom-animate-bounce !delay-100`}/>
      <span className={`w-[7px] aspect-square rounded-full bg-white custom-animate-bounce !delay-300`}/>
      <span className={`w-[7px] aspect-square rounded-full bg-white custom-animate-bounce !delay-500`}/>
    </li>
  )
}

export default Typing

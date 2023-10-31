import Image from "next/image"

const ImagesMessage = ({isCurrentUser,className}:{isCurrentUser:boolean,className?:string}) => {
  return (
    <div className={`w-full flex ${isCurrentUser ? "justify-end":"justify-start"}`}>
      <div className={`w-48 max-w-[40%] p-1 ${className}`}>
        <Image className="w-full aspect-square rounded-xl" src={`/images/people/1.jpg`} alt="ha" width={90} height={24}/>
        <span className="text-[11px] text-semiDark">{"12.00 PM"}</span>
      </div>
    </div>
  )
}



export default ImagesMessage

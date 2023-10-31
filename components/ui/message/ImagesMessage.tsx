import Image from "next/image"

const ImagesMessage = ({src,isCurrentUser,createdAt,className}:{src:string,isCurrentUser:boolean,createdAt:string,className?:string}) => {
  return (
    <div className={`w-full flex ${isCurrentUser ? "justify-end":"justify-start"}`}>
      <div className={`w-48 max-w-[40%] p-1 ${className}`}>
        <Image className="w-full aspect-square rounded-xl" src={src} alt="images message" width={90} height={24}/>
        <span className="text-[11px] text-semiDark">{createdAt}</span>
      </div>
    </div>
  )
}



export default ImagesMessage

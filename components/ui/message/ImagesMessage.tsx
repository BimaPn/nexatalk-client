import Image from "next/image"

const ImagesMessage = ({images,isCurrentUser,createdAt,className}:{images:string[],isCurrentUser:boolean,createdAt:string,className?:string}) => {
  return (
    <div className={`w-full flex ${isCurrentUser ? "justify-end":"justify-start"}`}>
      <div className={`w-[25%] flex flex-col gap-[6px] max-w-[40%] ${className}`}>
        <div className="w-full grid grid-cols-2 gap-[6px]">
          {images.map((image,index) => (
            <Image className="w-full aspect-square rounded-xl" src={image} alt="images message" width={90} height={24}/>
          ))}
        </div>  

        <span className="text-[11px] text-semiDark">{createdAt}</span>
      </div>
    </div>
  )
}



export default ImagesMessage

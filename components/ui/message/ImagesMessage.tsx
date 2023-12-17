import { MediaViewerProvider, mediaViewerContext } from "@/components/providers/MediaViewerProvider"
import Image from "next/image"
import { useContext } from "react"

const ImagesMessage = ({images,isCurrentUser,createdAt,className}:{images:string[],isCurrentUser:boolean,createdAt:string,className?:string}) => {
  const { setMedia } = useContext(mediaViewerContext) as MediaViewerProvider;
  
  const imagesLayout = () => {
   let layout = "w-full aspect-square ";

   if(images.length > 1) {
    layout += "grid grid-rows-2 grid-flow-col gap-[6px]";
   }
   return (
    <div className={`${layout} ${className}`}>
      {images.map((image,index) => (
        <button
        className={
          `${(images.length === 1) && "w-full aspect-square"}
           ${(images.length === 2) && "row-span-2"}
           ${(images.length === 3 && index == 2) && "row-span-2"}
          relative overflow-hidden rounded-lg
          `}
        onClick={(e) => showMediaViewer(e,image)}>
          <Image 
          src={image}
          alt="image message"
          fill
          style={{objectFit:"cover"}}
          />
        </button>
      ))}
    </div>  
  )
  }

  const showMediaViewer = (e:React.MouseEvent<HTMLButtonElement>,image:string) => {
    e.preventDefault();
    setMedia(image);
  }
  return (
    <div className={`w-full flex flex-col ${isCurrentUser ? "items-end":"items-start"}`}>
      <div className={`w-64 md:w-72 flex flex-col ${isCurrentUser ? "items-start" : "items-end"} gap-[6px]`}>
        {imagesLayout()}
        <span className="text-[11px] text-semiDark">{createdAt}</span>
      </div>

    </div>
  )
}



export default ImagesMessage

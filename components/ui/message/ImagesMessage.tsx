import { MediaViewerProvider, mediaViewerContext } from "@/components/providers/MediaViewerProvider"
import Image from "next/image"
import { useContext } from "react"

const ImagesMessage = ({images,isCurrentUser,createdAt,className}:{images:string[],isCurrentUser:boolean,createdAt:string,className?:string}) => {
  const { setMedia } = useContext(mediaViewerContext) as MediaViewerProvider;

  const showMediaViewer = (e:React.MouseEvent<HTMLButtonElement>,image:string) => {
    e.preventDefault();
    setMedia(image);
  }
  return (
    <div className={`w-full flex ${isCurrentUser ? "justify-end":"justify-start"}`}>
      <div className={`w-[25%] flex flex-col gap-[6px] max-w-[40%] ${className}`}>
        <div className="w-full grid grid-cols-2 gap-[6px]">
          {images.map((image,index) => (
            <button onClick={(e) => showMediaViewer(e,image)}>
              <Image 
               src={image}
               alt="images message"
               width={90} height={24}
               className="w-full aspect-square rounded-xl"/>
            </button>
          ))}
        </div>  

        <span className="text-[11px] text-semiDark">{createdAt}</span>
      </div>
    </div>
  )
}



export default ImagesMessage

import { MediaViewerProvider, mediaViewerContext } from "@/components/providers/MediaViewerProvider"
import { getVideoThumbnail } from "@/helpers"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { FaPlay } from "react-icons/fa6"

const MediaMessage = ({media, isCurrentUser, createdAt}:{media:string[],isCurrentUser:boolean,createdAt:string}) => {

  return (
    <div className={`w-full flex flex-col ${isCurrentUser ? "items-end":"items-start"}`}>
      <div className={`w-64 md:w-72 flex flex-col ${isCurrentUser ? "items-start" : "items-end"} gap-[6px]`}>
        <MediaLayout media={media} />
        <span className="text-[11px] text-semiDark">{createdAt}</span>
      </div>
    </div>
  )
}

const MediaLayout = ({media}:{media:string[]}) => {
  const { setMedia } = useContext(mediaViewerContext) as MediaViewerProvider;

  const showMediaViewer = (e:React.MouseEvent<HTMLButtonElement>,media:string) => {
    e.preventDefault();
    setMedia(media);
  }
   return (
    <div className={`w-full flex
    ${media.length > 1 && "grid grid-rows-2 grid-flow-col gap-[6px] aspect-square"}`}
    >
      {media.map((content, index) => (
        <button
        key={index}
        className={
          `${(media.length === 2) && "row-span-2"}
           ${(media.length === 3 && index == 2) && "row-span-2"}
           relative overflow-hidden rounded-lg
          `}
        onClick={(e) => showMediaViewer(e, content)}
        >
          {content.includes(".mp4") ? (
            <VideoThumbnail single={media.length === 1} url={content} />
          ) : (
            <MediaView single={media.length === 1} url={content} />
          )}
        </button>
      ))}
    </div>  
  )
}

const MediaView = ({ single, url }:{ single:boolean, url:string }) => {
  return single ? (
    <Image 
    src={url}
    alt={url}
    width={400}
    height={400}
    loading="lazy"
    className="w-full"
    />
  ) : (
    <Image 
    src={url}
    alt={url}
    fill
    loading="lazy"
    className="object-cover"
    />
)
}

const VideoThumbnail = ({ url, single }:{ url:string, single:boolean }) => {
  const [ thumbnail, setThumbnail ] = useState("");

  useEffect(() => {
    getVideoThumbnail(url, setThumbnail);
  },[]);
  return thumbnail && (
    <>
      <MediaView single={single} url={thumbnail} />  
      <div className="w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square bg-black/75 rounded-full flexCenter">
        <FaPlay className="text-xl text-white -mr-1" />
      </div>
    </>
  )
}





export default MediaMessage

"use client"

import Image from "next/image"
import { Dispatch, SetStateAction, createContext, useState } from "react"
import { IoClose } from "react-icons/io5"

export type MediaViewerProvider = {
  media:string | null,
  setMedia: Dispatch<SetStateAction<string | null>>
}

export const mediaViewerContext = createContext<MediaViewerProvider | null>(null) 

const MediaView = ({media,onClose}:{media:string|null,onClose:()=>void}) => {
  return media && (
    <div className="fixed right-0 left-0 top-0 bottom-0 flexCenter bg-black/90 z-[2000] py-8">

      <div className="absolute top-0 right-0 left-0 flex items-center justify-end px-5 py-4">
        <button onClick={() => onClose()} className="p-2 aspect-square rounded-full bg-semiLight">
          <IoClose className="text-[26px] text-dark" />
        </button>
      </div>  

      <Image 
      src={media}
      width={700}
      height={700} 
      alt="image detail" 
      className="block max-h-full"/>
    </div>
  )
}  
const MediaViewerProvider = ({children}:{children:React.ReactNode}) => {
  const [media,setMedia] = useState<string | null>("/images/people/1.jpg")
  return (
   <mediaViewerContext.Provider value={{ media,setMedia }}>
      {children}
      <MediaView media={media} onClose={() => setMedia(null)} />
   </mediaViewerContext.Provider> 
  )
}

export default MediaViewerProvider

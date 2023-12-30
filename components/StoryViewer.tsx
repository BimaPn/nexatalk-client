"use client"
import { createContext, useEffect, useRef, useState } from "react"
import RoundedImage from "./ui/RoundedImage"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import Image from "next/image"
import { IoClose } from "react-icons/io5"
import ReactPlayer from "react-player/lazy"

export const storyViewerContext = createContext<StoryViewer|null>(null);
const StoryViewer = ({children}:{children:React.ReactNode}) => {
  const [storyViewProperties, setStoryViewProperties] = useState<StoryViewProperties|null>(null);
  return (
    <storyViewerContext.Provider value={{ setStoryViewProperties }}>
      {children}
      {storyViewProperties && (
        <Contents 
        storyViewProperties={storyViewProperties} 
        onClose={() => setStoryViewProperties(null)}/>
      )}
    </storyViewerContext.Provider>
  )
}

const Contents = ({onClose, storyViewProperties}:{onClose:()=>void, storyViewProperties:StoryViewProperties}) => {
  const [current, setCurrent] = useState<number>(-1);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    setCurrent(storyViewProperties.lastSeen);
  },[]);

  useEffect(()=>{
    if(current >= storyViewProperties.contents.length) {
      onClose();
    }
    const loop = setInterval(()=>{
      nextButtonRef.current?.click();
    },3000);
    return () => {
      clearInterval(loop);
    }
    },[current]);

  const onNext = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(current < storyViewProperties.contents.length-1) {
      setCurrent((prev)=>current+1);
    }else {
      onClose();
    }
  }
  const onPrev = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if(current > 0) {
      setCurrent((prev)=>current-1);
    }else {
      onClose();
    }
  }
  return (
    <div className="fixed inset-0 flex flex-col items-center bg-black z-[6000]">


      <ContentHeader 
      length={storyViewProperties.contents.length}
      current={current}
      avatar={storyViewProperties.avatar}
      name={storyViewProperties.name}
      createdAt={storyViewProperties.contents[current == -1 ? 0 : current].createdAt}
      onClose={() => onClose()}
      />
      <ContentBody mediaUrl={storyViewProperties.contents[current == -1 ? 0 : current].media}>
       <div className="hidden ss:block text-white">
        <button 
        onClick={onPrev} 
        className="w-10 absolute left-2 aspect-square rounded-full bg-black/25 flexCenter">
          <IoIosArrowBack className="text-[22px]" />
        </button>   
        <button
        ref={nextButtonRef} 
        onClick={onNext}
        className="w-10 absolute right-2 aspect-square rounded-full bg-black/25 flexCenter">
          <IoIosArrowForward className="text-[22px]" />
        </button>   
       </div>
      </ContentBody> 
    </div>
  )
}

type ContentHeaderT = {
  length: number,
  current: number,
  avatar: string,
  name: string,
  createdAt: string,
  onClose: ()=>void
}
const ContentHeader = ({length, current, avatar, name, createdAt, onClose}:ContentHeaderT) => {
  return (
    <div className="absolute top-0 w-full ss:w-[512px] mt-2 ss:mt-4 z-[1]"> 
      <div className="w-full flexCenter gap-2 px-3 ss:px-0">
        {Array.from({ length }).map((_, index) => (
          <div key={index} className={`h-[3px] ${(index <= current-1) ? "bg-primary":"bg-slate-300"}`} style={{ flexBasis:"20%" }}>
            <div 
            className={`bg-primary w-0 h-full ${index == current ? "visible !w-full":"invisible"}`}
            style={{ transition: `${(index == current) ? "width linear 3s":"none"}` }}></div>
          </div>
        ))}
      </div>
      <div className="flexBetween gap-2 px-3 py-3">
        <div className="flex items-center gap-[10px]">
          <RoundedImage src={avatar} alt="heading" className="!w-[44px]" />
          <div className="flex flex-col text-white">
            <span className="font-medium">{name}</span>
            <span className="text-[13px]">{createdAt}</span>
          </div>
        </div>
        <button onClick={() => onClose()} className="px-2 aspect-square">
          <IoClose className="text-2xl text-white" />
        </button>
      </div>
    </div>
  )
}

const ContentBody = ({children, mediaUrl}:{children: React.ReactNode, mediaUrl: string}) => {
  return (
    <div className="w-full h-full flexCenter relative z-[0]">
      <Media mediaUrl={mediaUrl}/>
      {children}
    </div>
  )
}

const Media = ({mediaUrl}:{mediaUrl:string}) => {
  return (
    <>
    {mediaUrl.includes(".mp4") ? (
       <ReactPlayer url={mediaUrl} className="max-w-full w-auto h-fit" playing  />
    ) : (
      <div className="max-w-full w-auto h-fit">
        <Image
        src={mediaUrl}
        width={800} height={800}
        alt="example"
        className="" />
      </div>
    )}
    </>
  )
}
export default StoryViewer

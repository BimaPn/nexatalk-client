"use client"
import { createContext, useEffect, useRef, useState } from "react"
import RoundedImage from "./ui/RoundedImage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
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
    <div className="fixed inset-0 flex flex-col items-center px-3 py-2 bg-black z-[6000]">
      <button onClick={() => onClose()} className="absolute top-0 left-0 px-6 py-3 aspect-square z-[3]">
        <IoClose className="text-2xl text-white" />
      </button>
      <div className="absolute top-0 w-[512px] mt-2 z-[1]"> 
        <div className="w-full flexCenter gap-2">
          {Array.from({ length: storyViewProperties.contents.length }).map((_, index) => (
            <div key={index} className={`h-[3px] ${(index <= current-1) ? "bg-primary":"bg-slate-300"}`} style={{ flexBasis:"20%" }}>
              <div 
              className={`bg-primary w-0 h-full ${index == current ? "visible !w-full":"invisible"}`}
              style={{ transition: `${(index == current) ? "width linear 3s":"none"}` }}></div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-[10px] px-2 py-3">
          <RoundedImage src={storyViewProperties.avatar} alt="heading" className="!w-[44px]" />
          <div className="flex flex-col text-white">
            <span className="font-medium">{storyViewProperties.name}</span>
            <span className="text-[13px]">{storyViewProperties.contents[current == -1 ? 0 : current].createdAt}</span>
          </div>
        </div>
      </div>
      
      <div className="w-full h-full flexCenter relative z-[0]">
        
        <div className="max-w-full w-auto h-fit">
          <Image
          src={storyViewProperties.contents[current == -1 ? 0 : current].media}
          width={800} height={800}
          alt="example"
          className="" />
        </div>
       <div className="text-white">
        <button onClick={onPrev} className="w-10 absolute left-0 aspect-square flexCenter">
          <IoIosArrowBack className="text-[22px]" />
        </button>   
        <button ref={nextButtonRef} onClick={onNext} className="w-10 absolute right-0 aspect-square flexCenter">
          <IoIosArrowForward className="text-[22px]" />
        </button>   
       </div>
      </div>

    </div>
  )
}

export default StoryViewer

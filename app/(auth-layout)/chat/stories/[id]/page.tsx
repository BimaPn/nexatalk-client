"use client"
import Autoplay from 'embla-carousel-autoplay'
import RoundedImage from "@/components/ui/RoundedImage";
import { useEffect, useRef, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const page = () => {
const [current, setCurrent] = useState<number>(-1);
  const scrollNext = useRef<HTMLButtonElement>(null)
  const scrollPrev = useRef<HTMLButtonElement>(null)
  useEffect(()=> {
        setCurrent(0);

      },[])
  useEffect(()=>{
    const loop = setInterval(()=>{
      scrollNext.current?.click();
    },3000);

    const onNext = () => {
      if(current >= 5) {
        setCurrent(0);
        return;
      }
      setCurrent(prev => prev+1);
    }
    const onPrev = () => {
      if(current >= 0) {
        setCurrent(prev => prev-1);
      }
    }
    scrollNext.current?.addEventListener("click",onNext);
    scrollPrev.current?.addEventListener("click",onPrev);
    return () => {
      scrollNext.current?.removeEventListener("click",onNext)
      scrollPrev.current?.removeEventListener("click",onPrev);
      clearInterval(loop);
    }
    },[current])

  return (
    <section className='w-full overflow-hidden bg-white h-full p-3 sm:block hidden rounded-xl'>
        <div className="w-full h-full flex flex-col items-center bg-light rounded-xl">

        {/* HEADER */}
        <div className="w-[512px] mt-2">
          
          <div className="w-full flexCenter gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className={`h-[3px] ${(index <= current-1) ? "bg-primary":"bg-slate-300"}`} style={{ flexBasis:"20%" }}>
                <div 
                className={`bg-primary w-0 h-full ${index == current ? "visible !w-full":"invisible"}`}
                style={{ transition: `${(index == current) ? "width linear 3s":"none"}` }}></div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-[10px] px-2 py-2">
            <RoundedImage src="/images/people/1.jpg" alt="heading" className="!w-[44px]" />
            <div className="flex flex-col">
              <span className="text-dark font-medium">Ujang Anjir</span>
              <span className="text-[13px] text-gray-500">13.00 PM</span>
            </div>
          </div>
        </div>

        <div className="py-6 w-full h-full flexCenter">
          <Carousel
          opts={{
          align: "start",
          loop:true
          }}
          className="sm:w-[90%] h-full border"
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="basis-full flexCenter border">
                  <div>
                    <Image className="h-full" alt="example" width={600} height={600} src={`/images/people/1.jpg`}/> 
                  </div>

                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious ref={scrollPrev} />
            <CarouselNext ref={scrollNext}/>
          </Carousel> 
        </div>
      </div>
    </section>
  )
}

export default page 

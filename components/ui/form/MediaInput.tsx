"use client"
import { createContext, useState,useEffect, useContext, useRef } from "react"
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { getLocalVideoThumbnail } from "@/helpers";
import { FaPlay } from "react-icons/fa6";

const mediaInputContext = createContext<MediaInputContext | null>(null);

const MediaInput = ({children, value, className, onChange}:MediaInput) => {
  const [mediaPreviews,setMediaPreviews] = useState<string[]>();

  useEffect(() => {
    renderMedia(value);
  },[value]);

  const renderMedia = async (mediaFiles: File[]) => {
    const media = await Promise.all(
      mediaFiles.map(async (file) => {
        if (file.type === "video/mp4") {
          return new Promise<string>((resolve) => {
            getLocalVideoThumbnail(file, (url) => {
              resolve(url);
            });
          });
        }
        return URL.createObjectURL(file);
      })
    );

    setMediaPreviews(media);
  };

  const removeMedia = (index:number) => {
    onChange(value.filter(content => value.indexOf(content) !== index));
  }

  return (
    <mediaInputContext.Provider value={{value, onChange, removeMedia, mediaPreviews, setMediaPreviews}}>
      <div className={className}>
        {children}
      </div>
    </mediaInputContext.Provider>
  )
}

export const Trigger = ({children,className}:{children:React.ReactNode,className?:string}) => {
  const { value,onChange } = useContext(mediaInputContext) as MediaInputContext;
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const media = e.target.files;
    if(!media) return;
    const newMedia = Array.from(media) as File[];
    onChange([...value,...newMedia]);
  }
  return (
    <button className={className} type="button" onClick={() => inputRef.current!.click()}>
      <input 
      type="file"
      className="hidden"
      multiple
      accept=".jpg, .jpeg, .png, video/mp4"
      onChange={onInputChange}
      ref={inputRef}/>
      {children}
    </button>
  )
}

export const Previews = ({className}:{className?:string}) => {
  const { mediaPreviews, removeMedia } = useContext(mediaInputContext) as MediaInputContext;
  return mediaPreviews && (
  <div className={`min-w-full overflow-x-auto ${mediaPreviews.length !== 0 && "pt-2"}`}>
    <div className={`flex items-center gap-3 ${className}`}>
      {mediaPreviews.map((content, index) => (
        <MediaPreview
          key={index} 
          url={content}
          alt={content}  
          onRemove={() => removeMedia(index)} 
          className="aspect-square rounded-xl w-[60px] sm:w-20"
        />
      ))}
    </div>

  </div>
  )
}

const MediaPreview = ({url,alt,onRemove,className}:{url:string,alt:string,onRemove:()=>void,className?:string}) => {
  const mediaRemove = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemove();
  }
 return (
  <div className={`relative h-fit ${className}`}>
    <Image
    src={url}
    alt={alt}
    fill
    className="object-cover rounded"
    /> 

    {url.includes("data:image/jpeg") && (
      <div className="w-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square bg-black/75 rounded-full flexCenter">
        <FaPlay className="text-xl text-white -mr-1" />
      </div>
    )}

    <div className="absolute -top-4 -right-4 p-2" >
      <button
      onClick={mediaRemove}
      className="text-xl px-1 aspect-square rounded-full bg-white dark:bg-dark-semiDark border dark:border-0" >
        <IoClose/>
      </button>
    </div>
  </div>

 )
}

export default MediaInput


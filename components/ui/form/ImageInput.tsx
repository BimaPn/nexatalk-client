"use client"
import { createContext, useState,useEffect, useContext, useRef } from "react"
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const imageInputContext = createContext<ImageInputContext | null>(null);

const ImageInput = ({children,value,className,onChange}:ImageInput) => {
  const [imagePreviews,setImagePreviews] = useState<string[]>();

  useEffect(() => {
    renderImages(value);
  },[value]);

  const renderImages = (ImageFiles:File[]) => {
    const images = ImageFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(images);
  }

  const removeImage = (index:number) => {
    onChange(value.filter(image => value.indexOf(image) !== index));
  }

  return (
    <imageInputContext.Provider value={{value,onChange,removeImage,imagePreviews,setImagePreviews}}>
      <div className={className}>
        {children}
      </div>
    </imageInputContext.Provider>
  )
}

export const Trigger = ({children,className}:{children:React.ReactNode,className?:string}) => {
  const { value,onChange } = useContext(imageInputContext) as ImageInputContext;
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const images = e.target.files;
    if(!images) return;
    const newImages = Array.from(images) as File[];
    onChange([...value,...newImages]);
  }
  return (
    <button className={className} type="button" onClick={() => inputRef.current!.click()}>
      <input 
      type="file"
      className="hidden"
      multiple
      accept="image/*"
      onChange={onInputChange}
      ref={inputRef}/>
      {children}
    </button>
  )
}

export const Previews = ({className}:{className?:string}) => {
  const {imagePreviews,removeImage} = useContext(imageInputContext) as ImageInputContext;
  return imagePreviews && (
  <div className={`min-w-full overflow-x-auto ${imagePreviews.length !== 0 && "pt-2"}`}>
    <div className={`flex items-center gap-3 overflow-x-auto ${className}`}>
      {imagePreviews.map((image,index) => (
        <ImagePreview
          key={index} 
          src={image}
          alt={`image ${index}`}  
          onRemove={() => removeImage(index)} 
          className="aspect-square rounded-xl w-[15%] sm:w-[8%]"
        />
      ))}
    </div>

  </div>
  )
}

const ImagePreview = ({src,alt,onRemove,className}:{src:string,alt:string,onRemove:()=>void,className?:string}) => {
  const imageRemove = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onRemove();
  }
 return (
  <div className={`relative h-fit overflow-hidden ${className}`}>
    <Image
    src={src}
    alt={alt}
    fill
    style={{objectFit:"cover"}} /> 

    <div className="absolute top-0 right-0 p-2" >
      <button
      onClick={imageRemove}
      className="text-light text-xl px-1 aspect-square rounded-full bg-dark/30" >
        <IoClose/>
      </button>
    </div>
  </div>

 )
}

export default ImageInput


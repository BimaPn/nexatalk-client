import Image from "next/image"

const RoundedImage = ({src,className,alt}:{src:string,className?:string,alt:string}) => {
  return (
    <div className={`relative w-11 h-fit aspect-square rounded-full overflow-hidden ${className}`}>
        < Image 
        src={src} 
        alt={alt}
        fill
        style={{objectFit:"cover"}}
        />
    </div>
  )
}

export default RoundedImage

"use client"
import { useRef, useState } from "react"
import RoundedImage from "../RoundedImage";
import { FiEdit } from "react-icons/fi"

const AvatarInput = ({defaultAvatar, onChange, className}:{defaultAvatar:string, onChange:(file:File)=>void, className?:string}) => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [photoPreview,setPhotoPreview] = useState<string>(defaultAvatar);
  const changePhoto = (e:React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const selectedFile = fileInput.current!.files![0];
      if (selectedFile) {
        const blob = URL.createObjectURL(selectedFile);
        onChange(selectedFile)
        setPhotoPreview(blob)
      }
  }
  const openFile = (e:React.MouseEvent) => {
      e.preventDefault()
      fileInput.current?.click()
  }
  return (
    <div className={`flexCenter relative ${className}`}>
      <RoundedImage
      src={photoPreview}
      alt="avatar"
      className="!w-36"
      />
      <input ref={fileInput} type="file" accept="image/*" onChange={changePhoto} className="hidden" />
      <button onClick={openFile} className="absolute bg-black/50 text-light px-[6px] aspect-square flexCenter rounded-lg">
        <FiEdit className="text-xl" />
      </button>
    </div>
  )
}

export default AvatarInput

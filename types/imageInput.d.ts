interface ImageInputBased {
  value:File[],
  onChange : Dispatch<SetStateAction<File[]>>,
}

interface ImageInputContext extends ImageInputBased {
  removeImage : (index:number) => void, 
  imagePreviews ?: string[],
  setImagePreviews : Dispatch<SetStateAction<string[]>>
} 

interface ImageInput extends ImageInputBased {
  children : React.ReactNode,
  className ?: string
}

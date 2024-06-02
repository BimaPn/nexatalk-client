interface MediaInputBased {
  value:File[],
  onChange : (images:File[]) => void,
}

interface MediaInputContext extends MediaInputBased {
  removeMedia : (index:number) => void, 
  mediaPreviews ?: string[],
  setMediaPreviews : Dispatch<SetStateAction<string[]>>
} 

interface MediaInput extends MediaInputBased {
  children : React.ReactNode,
  className ?: string
}

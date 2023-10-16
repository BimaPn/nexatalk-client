'use client'
import { useRef,useEffect,TextareaHTMLAttributes } from "react"

const TextArea = ({className,handleSubmit,rows,...props}:TextareaHTMLAttributes<HTMLTextAreaElement> & {className ?:string,handleSubmit?:()=>void}) => {
  const textarea = useRef<HTMLTextAreaElement>(null)
  useEffect(()=>{
    const autoGrowTextarea = () => {
      textarea!.current!.style.height = 'auto';
      textarea!.current!.style.height = textarea.current!.scrollHeight + 'px';
    }
    const keydownFunc = (e:KeyboardEvent) => {
      if(e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if(handleSubmit) {
          handleSubmit();
        }
      }
    }
    textarea.current?.addEventListener("keydown",keydownFunc);
    textarea.current?.addEventListener('input',autoGrowTextarea)
    return () => {
      textarea.current?.removeEventListener('input',autoGrowTextarea)
      textarea.current?.removeEventListener("keydown",keydownFunc);
    }
  },[])
  return (
    <textarea 
    ref={textarea}
    rows={rows}
    className={`w-full overflow-y-hidden resize-none focus:outline-none flex items-center ${className}`}
    {...props}>
    </textarea>
  )
}

export default TextArea

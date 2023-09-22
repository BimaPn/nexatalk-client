'use client'
import { useRef,useEffect,TextareaHTMLAttributes } from "react"

const TextArea = ({className,rows,...props}:TextareaHTMLAttributes<HTMLTextAreaElement> & {className ?:string}) => {
  const textarea = useRef<HTMLTextAreaElement>(null)
  useEffect(()=>{
    const autoGrowTextarea = () => {
      textarea!.current!.style.height = 'auto';
      textarea!.current!.style.height = textarea.current!.scrollHeight + 'px';
    }
    textarea.current?.addEventListener('input',autoGrowTextarea)
    return () => textarea.current?.removeEventListener('input',autoGrowTextarea)
  },[])
  return (
    <textarea 
    ref={textarea}
    rows={rows}
    className={`w-full overflow-y-hidden resize-none focus:outline-none ${className}`}
    {...props}>
    </textarea>
  )
}

export default TextArea

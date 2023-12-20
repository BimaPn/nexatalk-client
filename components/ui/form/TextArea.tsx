import { TextareaHTMLAttributes } from "react"

const TextArea = ({className,rows=3,...props}:TextareaHTMLAttributes<HTMLTextAreaElement> & {className ?:string}) => {
  return (
    <textarea 
      className={`w-full border border-gray-300 rounded-lg peer focus:outline-primary ${className}`}
      placeholder=" "
      rows={rows}
      {...props}>
    </textarea>
  )
}

export default TextArea

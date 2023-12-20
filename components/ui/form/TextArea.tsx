import { TextareaHTMLAttributes } from "react"

const TextArea = ({className,...props}:TextareaHTMLAttributes<HTMLTextAreaElement> & {className ?:string}) => {
  return (
    <textarea 
      className={`w-full border border-gray-300 rounded-lg px-4 py-2 peer focus:outline-primary ${className}`}
      placeholder=" "
      {...props}>
    </textarea>
  )
}

export default TextArea

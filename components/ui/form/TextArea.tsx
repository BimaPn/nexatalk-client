import { TextareaHTMLAttributes } from "react"

const TextArea = ({className,...props}:TextareaHTMLAttributes<HTMLTextAreaElement> & {className ?:string}) => {
  return (
    <textarea 
      className={`w-full bg-transparent border border-gray-300 dark:border-dark-semiLight rounded-lg px-4 py-2 peer focus:outline-primary dark:focus:outline-dark-light ${className}`}
      placeholder=" "
      {...props}>
    </textarea>
  )
}

export default TextArea

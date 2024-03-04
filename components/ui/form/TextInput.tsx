import {InputHTMLAttributes} from 'react'

const TextInput = ({className,...props}:InputHTMLAttributes<HTMLInputElement> & {className ?:string}) => {
  return (
    <input
    placeholder=' '
    className={`w-full block bg-transparent border-2 border-gray-300 dark:border-dark-semiLight focus:!outline-none focus:!border-primary rounded-lg py-2 px-4 peer ${className}`} 
    {...props}/>
  )
}

export default TextInput

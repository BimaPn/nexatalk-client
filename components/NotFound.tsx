import React from 'react'
import { CgUnavailable } from "react-icons/cg"

const NotFound = ({className}:{className?:string}) => {
  return (
    <div className={`w-full flexCenter text-gray-400 dark:text-slate-400 flex-col ${className}`}>
      <CgUnavailable className="text-[94px]" />
      <span className='font-bold'>Not Found</span>
    </div>
  )
}

export default NotFound

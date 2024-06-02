import { useState } from 'react'

const ExpandedText = ({text, maxLength=768, className}:{text:string, maxLength?:number, className?:string}) => {
  const [isExpanded,setIsExpanded] = useState<boolean>(text.length <= maxLength);
  return (
      <p className={`text-sm break-all ${className}`}>
        {isExpanded ? text : text.slice(0,maxLength)}
        {isExpanded == false && (
          <span className="font-medium ml-2 cursor-pointer" onClick={() => setIsExpanded(true)}>read more</span>
        )}
      </p>
  )
}

export default ExpandedText

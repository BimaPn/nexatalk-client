'use client'
import { useState } from "react";
const Check = () => {
    const [isClick,setIsClick] = useState<boolean>(false);
  return (
    <div>
        <p>click bro</p>
        {isClick ? <h1>You clicked</h1> : <p>Click the button !!</p>}
        <button onClick={() => setIsClick(prev => !prev)}>Click</button>
    </div>
  )
}

export default Check
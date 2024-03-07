import Skeleton from "./Skeleton"

const ChatMenuSkeleton = ({count=5}:{count?:number}) => {
  return (
    <div className="flex flex-col gap-5 px-3 mt-7">
      {Array(count).fill(0).map((item,i) => (
        <ChatItemSkeleton key={i} /> 
      ))}
    </div>
  )
}
const ChatItemSkeleton = () => {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="!min-w-16 circle" />
      <div className="w-[80%] flex flex-col gap-2">
        <Skeleton className="size-xs w-1/3" />
        <Skeleton className="size-xs w-full" />
      </div>
    </div>
  )
}

export default ChatMenuSkeleton

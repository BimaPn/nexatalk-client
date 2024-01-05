import Skeleton from "./Skeleton"

const ChatMenuSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 px-3 mt-7">
      {[1,2,3,4,5].map((item) => (
        <ChatItemSkeleton key={item} /> 
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

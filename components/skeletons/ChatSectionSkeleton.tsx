import Skeleton from "./Skeleton"

const ChatSectionSkeleton = () => {
  return (
    <>
      <div className="w-full px-3 py-[11px] flex items-center gap-3">
        <Skeleton className="circle" />
        <Skeleton className="w-[20%] md:w-[15%] size-md" />
      </div>  
      <Skeleton className="h-[92%] mx-3 !rounded-xl" />
    </>
  )
}

export default ChatSectionSkeleton

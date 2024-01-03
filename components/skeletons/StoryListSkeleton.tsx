import Skeleton from "./Skeleton"

const StoryListSkeleton = ({ count= 1 }:{count?: number}) => {
  return Array(count).fill(0).map((_,index) => (
    <div key={index} className="flex items-center gap-2 px-2 py-2">
      <Skeleton className="!min-w-16 circle" />
      <div className="w-[80%] flex flex-col gap-2">
        <Skeleton className="size-xs w-1/2" />
        <Skeleton className="size-xs w-1/5" />
      </div>
    </div>
    )
  )
}

export default StoryListSkeleton;

import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext, useEffect } from "react"
import { MenuProvider, menuContext } from "../providers/MenuProvider"
import RoundedImage from "../ui/RoundedImage"
import { TbCameraPlus } from "react-icons/tb"
import AddStory from "../AddStory"
import { storyListContext } from "../providers/StoryListProvider"
import StoryViewer, { storyViewerContext } from "../StoryViewer"
import StoryListSkeleton from "../skeletons/StoryListSkeleton"
import ApiClient from "@/app/api/axios/ApiClient"
import { dateToTime } from "@/lib/converter"

const StoriesMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout>
      <Navigation title="Stories" onClose={() => changeMenu("chatsMenu")}>
        <div className="flex justify-end">
          <AddStory /> 
        </div>
      </Navigation>
      <StoryItemLayout />
    </MenuLayout>
  )
}

const StoryItemLayout = () => {
  const { stories, setStories, userStory, updateUserStory, isContentLoaded, setIsContentLoaded } = useContext(storyListContext) as StoryListProvider;
  useEffect(() => {
    if(!isContentLoaded) {
      ApiClient.get(`stories/friends-last-story/get`)
      .then((res) => {
        const _userStory = res.data.userStory;
        if(_userStory) {
          updateUserStory(_userStory);
        }
        setStories(res.data.stories)
        setIsContentLoaded(true);
      })
      .catch((err) => {
        console.error(err);
      });
    }

  },[]);
  const updateStoryItem = (id: string, hasSeen: boolean) => {
    setStories((prevStories: StoryItem[]) => {
      return prevStories.map((story) => {
        if(story._id == id) {
          story.hasSeen = hasSeen;
        }
        return story;
      });
    });
  }
  return (
    <StoryViewer onClose={updateStoryItem}>
      <div className="px-2 mb-2">
        {!isContentLoaded ? <StoryListSkeleton /> : (
          <StoryItem
          _id={userStory._id}
          avatar={userStory.avatar}
          name={userStory.name}
          createdAt={userStory.createdAt}
          hasSeen={true}
          disableButton={userStory.createdAt === "No update"}/>
        )}
        <div className="mt-1">
          <span className="inline-block text-black dark:text-white text-sm font-medium mx-2">Friends</span>
          <ul className="flex flex-col gap-[2px]">
            {!isContentLoaded && <StoryListSkeleton count={4} />}
            {(isContentLoaded && stories.length != 0) && 
              stories.map((item) => (
                <li key={item._id}>
                  <StoryItem 
                  _id={item._id}
                  avatar={item.avatar}
                  name={item.name}
                  createdAt={dateToTime(item.createdAt)}
                  hasSeen={item.hasSeen} />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </StoryViewer>
  )
}

const StoryItem = ({_id, avatar, name, createdAt, hasSeen=false,disableButton=false}:StoryItem & {disableButton?:boolean}) => {
  const { setStoryViewProperties } = useContext(storyViewerContext) as StoryViewer;
  const viewContent = async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(disableButton) return;
    await ApiClient.get(`stories/user-stories/${_id}/get`)
    .then((res) => {
      const data = res.data.stories;
      const properties: StoryViewProperties = {
        authorId: _id,
        name,
        avatar,
        seenStories: data.seenStories,
        contents: data.contents,
        position: data.position
      }
      setStoryViewProperties(properties);
    })
    .catch((err) => {
      console.log(err)
    });

  }
  return (
    <button onClick={viewContent} className="w-full flex items-center gap-[10px] px-2 py-2 rounded-xl hover:bg-light dark:hover:bg-dark-netral cursor-pointer">
      <div className={`w-fit p-[2px] rounded-full border-2 ${!hasSeen ? "border-primary":"border-gray-300"}`}>
        <RoundedImage src={avatar} alt="heading" className="!w-[42px]" />
      </div>
      <div className="w-full text-start flex flex-col">
        <span className="text-black dark:text-white font-medium">{name}</span>
        <span className="text-[13px] text-gray-500 dark:text-slate-400">{createdAt}</span>
      </div>
    </button>
  )
}

export const StoriesMenuTrigger = ({children, className}:{children?:React.ReactNode, className?:string}) => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <button onClick={() => changeMenu("storiesMenu")} className={`relative group ${className}`}>
      {children}
      <span className="hidden group-hover:block absolute -bottom-7 -left-8 bg-white dark:bg-dark-netral rounded px-[6px] py-[2px] shadow text-[11px]">Stories</span>
    </button>
  )
}

export default StoriesMenu

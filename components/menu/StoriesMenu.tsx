import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext } from "react"
import { MenuProvider, menuContext } from "../providers/MenuProvider"
import RoundedImage from "../ui/RoundedImage"
import { TbCameraPlus } from "react-icons/tb"
import AddStory from "../AddStory"
import { storyListContext } from "../providers/StoryListProvider"
import StoryViewer, { storyViewerContext } from "../StoryViewer"

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
  const { stories } = useContext(storyListContext) as StoryListProvider;
  return (
    <StoryViewer>
      <div className="px-2 mb-2">
        <StoryItem id="haha" avatar="/images/people/charliecottrell.jpg" heading="Your story" subHeading="Tap to add" isActive={false}/>
        <div className="mt-1">
          <span className="inline-block text-dark text-sm font-medium mx-2">Friends</span>
          <ul className="flex flex-col gap-[2px]">
            {stories.map((item) => (
              <StoryItem 
              key={item.id}
              id={item.id}
              avatar={item.avatar}
              heading={item.heading}
              subHeading={item.subHeading}
              isActive={item.isActive} />
            ))}
          </ul>
        </div>
      </div>
    </StoryViewer>
  )
}

const StoryItem = ({id, avatar, heading, subHeading, isActive=false}:StoryItem) => {
  const { setStoryViewProperties } = useContext(storyViewerContext) as StoryViewer;
  const viewContent = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contents = [
    {
      media: "/video/example.mp4",
      createdAt: "12.00 AM"
    },
    {
      media: "/images/people/2.jpg",
      createdAt: "15.00 PM"
    },
    {
      media: "/video/example.mp4",
      createdAt: "12.00 AM"
    },
    {
      media: "/images/people/davidmarlan.jpg",
      createdAt: "08.00 PM"
    },
    {
      media: "/images/people/sarahaurell.jpg",
      createdAt: "23.00 PM"
    },
    ]
    const properties = {
      name: heading,
      avatar,
      contents: contents,
      lastSeen: 0
    }
    setStoryViewProperties(properties);
  }
  return (
    <button onClick={viewContent} className="w-full flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-light cursor-pointer">
      <div className={`w-fit p-[2px] rounded-full border-2 ${isActive ? "border-primary":"border-gray-300"}`}>
        <RoundedImage src={avatar} alt="heading" className="!w-[42px]" />
      </div>
      <div className="w-full text-start flex flex-col">
        <span className="text-dark font-medium">{heading}</span>
        <span className="text-sm text-gray-500">{subHeading}</span>
      </div>
    </button>
  )
}

export default StoriesMenu

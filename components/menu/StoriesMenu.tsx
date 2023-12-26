import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext } from "react"
import { MenuProvider, menuContext } from "../providers/MenuProvider"
import RoundedImage from "../ui/RoundedImage";

const StoriesMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  
  const stories = [
  {
    avatar: "/images/people/1.jpg",
    heading: "Rocky Kusnandar",
    subHeading: "12.00 PM",
    isActive: true
  },
  {
    avatar: "/images/people/2.jpg",
    heading: "Jessica Jolyne",
    subHeading: "03.00 AM",
    isActive: true
  },
  {
    avatar: "/images/people/3.jpg",
    heading: "John Docker",
    subHeading: "14.00 PM",
    isActive: false
  },
  {
    avatar: "/images/people/davidmarlan.jpg",
    heading: "Muhammad Asep",
    subHeading: "18.00 PM",
    isActive: true
  },
  {
    avatar: "/images/people/sarahaurell.jpg",
    heading: "Sarah Aurell",
    subHeading: "09.00 AM",
    isActive: false
  },
  ]
  return (
    <MenuLayout>
      <Navigation title="Stories" onClose={() => changeMenu("chatsMenu")} />
      <div className="px-2 mb-2">
        <StoryItem avatar="/images/people/charliecottrell.jpg" heading="Your story" subHeading="Tap to add"/>
        <div className="mt-1">
          <span className="inline-block text-dark text-sm font-medium mx-2">Friends</span>
          <ul className="flex flex-col gap-[2px]">
            {stories.map((item) => (
              <li key={item.avatar}>
                <StoryItem avatar={item.avatar} heading={item.heading} subHeading={item.subHeading} isActive={item.isActive} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MenuLayout>
  )
}

const StoryItem = ({avatar, heading, subHeading, isActive=false}:{avatar: string, heading: string, subHeading: string, isActive?:boolean}) => {
  return (
    <div className="flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-light cursor-pointer">
      <div className={`w-fit p-[2px] rounded-full border-2 ${isActive ? "border-primary":"border-gray-300"}`}>
        <RoundedImage src={avatar} alt="heading" className="!w-[42px]" />
      </div>

      <div className="flex flex-col">
        <span className="text-dark font-medium">{heading}</span>
        <span className="text-sm text-gray-500">{subHeading}</span>
      </div>
    </div>
  )
}

export default StoriesMenu

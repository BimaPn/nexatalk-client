"use client"
import { createContext, useState } from "react"

export const storyListContext = createContext<StoryListProvider | null>(null);

type UserInfo = {
  id: string,
  avatar: string
}
const StoryListProvider = ({children, userInfo}:{children:React.ReactNode, userInfo:UserInfo}) => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [userStory, setUserStory] = useState<StoryItem>({
    _id: userInfo.id,
    avatar: userInfo.avatar,
    name: "My story",
    createdAt: "No update",
    hasSeen: true 
  });
  const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false);
  
  const addStoryItem = (story:StoryItem) => {
    setStories((prev) => {
      const filtered = prev.filter((item) => item._id !== story._id);
      return [story, ...filtered];
    })
  }
  const updateUserStory = (createdAt:string) => {
    setUserStory({...userStory, createdAt});
  }
  return (
    <storyListContext.Provider value={{ stories, setStories, isContentLoaded, setIsContentLoaded, userStory, updateUserStory, addStoryItem }}>
    {children}
    </storyListContext.Provider>
  )
}

export default StoryListProvider

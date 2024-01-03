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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  const addStoryItems = (story:StoryItem) => {
    setStories((prev) => [story, ...prev]);
  }
  const updateStoryItem = (story:StoryItem) => {
    console.log("test")
  }
  return (
    <storyListContext.Provider value={{ stories, setStories, isLoaded, setIsLoaded, userStory, setUserStory }}>
    {children}
    </storyListContext.Provider>
  )
}

export default StoryListProvider

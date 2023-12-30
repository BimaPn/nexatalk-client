"use client"
import { createContext, useState } from "react"

export const storyListContext = createContext<StoryListProvider | null>(null);

  const exampleStories = [
  {
    id: "123",
    avatar: "/images/people/1.jpg",
    heading: "Rocky Kusnandar",
    subHeading: "12.00 PM",
    isActive: true
  },
  {
    id: "234",
    avatar: "/images/people/2.jpg",
    heading: "Jessica Jolyne",
    subHeading: "03.00 AM",
    isActive: true
  },
  {
    id: "345",
    avatar: "/images/people/3.jpg",
    heading: "John Docker",
    subHeading: "14.00 PM",
    isActive: false
  },
  {
    id: "456",
    avatar: "/images/people/davidmarlan.jpg",
    heading: "Muhammad Asep",
    subHeading: "18.00 PM",
    isActive: true
  },
  {
    id: "567",
    avatar: "/images/people/sarahaurell.jpg",
    heading: "Sarah Aurell",
    subHeading: "09.00 AM",
    isActive: false
  },
  ]

const StoryListProvider = ({children}:{children:React.ReactNode}) => {
  const [stories, setStories] = useState<StoryItem[]>(exampleStories);
  
  const addStoryItem = (story:StoryItem) => {
    setStories((prev) => [story, ...prev]);
  }
  const updateStoryItem = (story:StoryItem) => {
    console.log("test")
  }
  return (
    <storyListContext.Provider value={{ stories }}>
    {children}
    </storyListContext.Provider>
  )
}

export default StoryListProvider

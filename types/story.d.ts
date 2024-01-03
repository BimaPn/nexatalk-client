interface StoryListProvider {
  stories: StoryItem[],
  setStories: Dispatch<SetStateAction<StoryItem[]>>,
  userStory: StoryItem,
  setUserStory: Dispatch<SetStateAction<StoryItem>>,
  isLoaded: boolean,
  setIsLoaded: Dispatch<SetStateAction<boolean>>
}
interface StoryItem {
  _id: string,
  avatar: string,
  name: string,
  createdAt: string,
  hasSeen: boolean
}
interface StoryViewer {
  setStoryViewProperties: Dispatch<SetStateAction<StoryViewProperties>>,
  ispaused: boolean,
  setIspaused: Dispatch<SetStateAction<boolean>>,
  duration: number,
  setDuration: Dispatch<SetStateAction<number>>,
}
interface StoryViewProperties {
  name: string,
  avatar: string,
  contents: StoryContent[],
  lastSeen: number
}
interface StoryContent {
  media: string,
  caption?: string
  createdAt: string
}

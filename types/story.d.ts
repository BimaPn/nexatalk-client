interface StoryListProvider {
  stories: StoryItem[]
}
interface StoryItem {
  id: string,
  avatar: string,
  heading: string,
  subHeading: string,
  isActive: boolean
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

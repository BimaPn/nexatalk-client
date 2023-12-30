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
  setStoryViewProperties: Dispatch<SetStateAction<StoryViewProperties>>
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

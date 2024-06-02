interface StoryListProvider {
  stories: StoryItem[],
  setStories: Dispatch<SetStateAction<StoryItem[]>>,
  userStory: StoryItem,
  updateUserStory: (createdAt:string)=>void,
  isContentLoaded: boolean,
  setIsContentLoaded: Dispatch<SetStateAction<boolean>>,
  addStoryItem: (story:StoryItem) => void
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
  seenStories: boolean[]|null,
  setSeenStories: Dispatch<SetStateAction<boolean[]|null>>
}
interface StoryViewProperties {
  authorId: string,
  name: string,
  avatar: string,
  contents: StoryContent[],
  seenStories : boolean[] | null,
  position: number
}
interface StoryContent {
  id: string
  media: string,
  caption?: string
  createdAt: string
}

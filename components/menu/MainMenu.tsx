"use client"
import { useContext, useEffect } from "react"
import { MenuProvider as MenuProviderType, menuContext } from "../providers/MenuProvider"
import ChatsMenu from "./ChatsMenu";
import SettingsMenu from "./SettingsMenu";
import { UserSession, userSessionContext } from "../providers/UserSessionProvider";
import { SocketProvider, socketContext } from "../providers/SocketProvider";
import StoriesMenu from "./StoriesMenu";
import AppearanceMenu from "./AppearanceMenu";
import { chatListContext } from "../providers/ChatListProvider";
import { storyListContext } from "../providers/StoryListProvider";

const MainMenu = ({accessToken}:{accessToken:string}) => {
  const { chatSocket, storiesSocket } = useContext(socketContext) as SocketProvider;
  const { user } = useContext(userSessionContext) as UserSession;
  const { currentMenu } = useContext(menuContext) as MenuProviderType;
  const { isLoaded, addChatToList, setOnlineUser } = useContext(chatListContext) as ChatList;
  const { isContentLoaded, addStoryItem } = useContext(storyListContext) as StoryListProvider;
  
  useEffect(() => {
    if(!isLoaded || !chatSocket) return;
    const receiveMessage = ({message,from}:{message:string,from:ChatItem}) => {
      addChatToList(from);
    };
    const checkOnline = (username:string, isOnline:boolean) => {
      setOnlineUser(username, isOnline);
    };

    chatSocket.on("message", receiveMessage);    
    chatSocket.on("onlineUser", checkOnline);
    return () => {
      chatSocket.off("message", receiveMessage);
      chatSocket.off("onlineUser", checkOnline);
    }
  },[chatSocket, isLoaded]); 

  useEffect(() => {
    if(!isContentLoaded || !storiesSocket) return;
    const getNewStory = (storyItem:StoryItem) => {
      console.log(storyItem)
      addStoryItem(storyItem); 
    }
    storiesSocket.on("newStory",getNewStory);
    return () => {
      storiesSocket.off("newStory",getNewStory);
    }
  },[storiesSocket, isContentLoaded]);

  return (
    <section>
     {currentMenu === "chatsMenu" && <ChatsMenu avatar={user.avatar} accessToken={accessToken} />} 
     {currentMenu === "settingsMenu" && <SettingsMenu userAuth={user} />} 
     {currentMenu === "appearanceMenu" && <AppearanceMenu />} 
     {currentMenu === "storiesMenu" && <StoriesMenu />} 
    </section>
  )
}

export default MainMenu

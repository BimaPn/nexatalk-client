"use client"
import { useContext, useEffect } from "react"
import { MenuProvider as MenuProviderType, menuContext } from "../providers/MenuProvider"
import ChatsMenu from "./ChatsMenu";
import SettingsMenu from "./SettingsMenu";
import { UserSession, userSessionContext } from "../providers/UserSessionProvider";
import { SocketProvider, socketContext } from "../providers/SocketProvider";
import StoriesMenu from "./StoriesMenu";
import AppearanceMenu from "./AppearanceMenu";

const MainMenu = ({accessToken}:{accessToken:string}) => {
  const { socket, isConnected, setIsConnected } = useContext(socketContext) as SocketProvider;
  const { user } = useContext(userSessionContext) as UserSession;
  const { currentMenu } = useContext(menuContext) as MenuProviderType;

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  },[]);

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

"use client"
import { useContext } from "react"
import { MenuProvider as MenuProviderType, menuContext } from "../providers/MenuProvider"
import ChatMenu from "./ChatMenu";
import SettingsMenu from "./SettingsMenu";
import { UserSession, userSessionContext } from "../providers/UserSessionProvider";

const MainMenu = ({accessToken}:{accessToken:string}) => {
  const { user } = useContext(userSessionContext) as UserSession;
  const { currentMenu } = useContext(menuContext) as MenuProviderType;
  return (
    <section>
     {currentMenu === "chatMenu" && <ChatMenu avatar={user.avatar} accessToken={accessToken} />} 
     {currentMenu === "settingsMenu" && <SettingsMenu userAuth={user} />} 
    </section>
  )
}

export default MainMenu

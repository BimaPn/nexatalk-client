"use client"
import { useContext } from "react"
import { MenuProvider as MenuProviderType, menuContext } from "../providers/MenuProvider"
import ChatMenu from "./ChatMenu";
import SettingsMenu from "./SettingsMenu";

const MainMenu = ({accessToken, userAuth}:{accessToken:string, userAuth:AuthUser}) => {
  const { currentMenu } = useContext(menuContext) as MenuProviderType;
  return (
    <section>
     {currentMenu === "chatMenu" && <ChatMenu accessToken={accessToken} />} 
     {currentMenu === "settingsMenu" && <SettingsMenu accessToken={accessToken} userAuth={userAuth} />} 
    </section>
  )
}

export default MainMenu

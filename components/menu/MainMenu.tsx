"use client"
import { useContext } from "react"
import { MenuProvider as MenuProviderType, menuContext } from "../providers/MenuProvider"
import ChatMenu from "./ChatMenu";
import SettingsMenu from "./SettingsMenu";

const MainMenu = ({accessToken}:{accessToken:string}) => {
  const { currentMenu } = useContext(menuContext) as MenuProviderType;
  return (
    <section>
     {currentMenu === "chatMenu" && <ChatMenu accessToken={accessToken} />} 
     {currentMenu === "settingsMenu" && <SettingsMenu />} 
    </section>
  )
}

export default MainMenu

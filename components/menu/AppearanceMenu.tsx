import MenuLayout, { Navigation } from "@/layouts/MenuLayout"
import { useContext } from "react"
import { MenuProvider, menuContext } from "../providers/MenuProvider"
import ThemeSwitcher from "../ThemeSwitcher";

const AppearanceMenu = () => {
  const { changeMenu } = useContext(menuContext) as MenuProvider;
  return (
    <MenuLayout>
      <Navigation title="Appearance" onClose={() => changeMenu("settingsMenu")} />
      <section className="px-3 py-2">
        <ul className="px-3 py-3 bg-light dark:bg-dark-dark rounded-xl">
          <li className="flexBetween ">
            <span className="font-medium block text-black dark:text-white">Theme</span>
            <ThemeSwitcher />
          </li>
        </ul>
      </section>
    </MenuLayout>
  )
}

export default AppearanceMenu

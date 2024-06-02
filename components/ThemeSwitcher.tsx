"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true),[]);

  const toggleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(resolvedTheme === "dark") {
      setTheme("light");
    }else {
      setTheme("dark");
    }
  }
  return (
  <>
    {!mounted && (
      <div className="px-2">
        <LoadingSpinner />
      </div>
    )}
    {mounted && (
      <button onClick={toggleClick} className={`w-11 bg-primary/60 dark:bg-dark-netral rounded-full p-[3px]`}>
       <div className={`w-[45%] aspect-square rounded-full bg-white ${resolvedTheme === "dark" ? "translate-x-[120%]":"translate-x-0"} toggle-transition`} /> 
      </button>
    )}
  </>
  )
}

export default ThemeSwitcher

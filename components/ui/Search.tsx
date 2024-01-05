import { FiSearch } from "react-icons/fi"

const Search = () => {
  return (
    <div className="w-full px-3">
     <div className="flex items-center bg-light dark:bg-dark-netral rounded-xl">
      < FiSearch className="w-12 text-[20px] text-netral dark:text-slate-400" />
      <input
      type="text"
      className="w-full py-2 bg-transparent focus:outline-none placeholder:text-netral dark:placeholder:text-slate-400 placeholder:text-[15px]" placeholder="Search" />
     </div> 
    </div>
  )
}

export default Search

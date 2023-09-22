import { FiSearch } from "react-icons/fi"

const Search = () => {
  return (
    <div className="w-full px-2">
     <div className="flex items-center bg-light rounded-xl ">
      < FiSearch className="w-12 text-[22px] text-netral" />
      <input type="text" className="w-full py-[8px] bg-transparent focus:outline-none placeholder:text-netral" placeholder="Search" />
     </div> 
    </div>
  )
}

export default Search

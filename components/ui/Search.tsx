import { FiSearch } from "react-icons/fi"

const Search = () => {
  return (
    <div className="w-full px-3">
     <div className="flex items-center bg-light rounded-lg">
      < FiSearch className="w-12 text-[20px] text-netral" />
      <input type="text" className="w-full py-2 bg-transparent focus:outline-none placeholder:text-netral placeholder:text-[15px]" placeholder="Search" />
     </div> 
    </div>
  )
}

export default Search

import React, {useState, useEffect} from "react";

const SearchBar = () => {
    const [SearchQuery, setSearchQuery] = useState("");   //search content on the change of input box using
    const [SearchResults, setSearchResults]   = useState([])//store all data in a state 
    async function getApiData() {
        const apiData = await fetch(`https://dummyjson.com/products/search?q=${setSearchQuery}`);
        const jsonData = await apiData.json();
        console.log(jsonData);
    }
    useEffect(()=> {
        getApiData();
    }, [SearchQuery]);
  return (
    <div
      className="
        flex w-full items-center
        border border-blue-300
        rounded-full
        bg-white
        overflow-hidden
        transition-all duration-200
        focus-within:border-blue-600
        focus-within:ring-2
        focus-within:ring-blue-200
        shadow-sm
        hover:shadow-md
      "
    >
       { console.log("Search Query", SearchQuery)}
      <input
        value={SearchQuery}  // whatever in the state (setSearchQuery) will be shown in the UI
        onChange={(event) => {setSearchQuery(event.target.value);}}  // whatever we write in the input box will be set to the state using setSearchQuery
        type="text"
        placeholder="Search for products..."
        className="
          w-full
          px-5 py-2.5
          text-sm text-gray-700
          placeholder-gray-400
          bg-transparent
          focus:outline-none
        "
      />

      <button
        className="
          px-6 py-2.5
          bg-blue-600
          text-white text-sm font-semibold
          hover:bg-blue-700
          transition-colors
        "
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

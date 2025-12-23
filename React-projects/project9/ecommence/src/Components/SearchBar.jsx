import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const timerId = useRef(null);  // useRef to store timer ID for debounce

  async function getApiData() {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }
    console.log("Api called", searchQuery);
    const apiData = await fetch(
      `https://dummyjson.com/products/search?q=${searchQuery}`
    );
    const jsonData = await apiData.json();
    setSearchResults(jsonData?.products || []);
  }

  useEffect(() => {
    if(timerId.current){
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(()=>{   // debounce logic
      getApiData();
    },500)
  }, [searchQuery]);

  return (
    <div className="relative w-full">
      {/* Search Input */}
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
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
      </div>

      {/* Suggestions Dropdown */}
      {searchQuery.trim() && searchResults.length > 0 && (
        <div
          className="
            absolute top-full left-0 right-0 mt-2
            bg-white
            border border-gray-200
            rounded-xl
            shadow-lg
            max-h-64 overflow-y-auto
            z-50
          "
        >
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="
                flex items-center gap-3
                px-4 py-3
                cursor-pointer
                hover:bg-gray-100
                transition               
              "
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-10 h-10 rounded-md object-cover flex-shrink-0"
              />
              <p className="text-sm text-gray-700 leading-tight line-clamp-2">
                {product.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
